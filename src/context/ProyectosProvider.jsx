import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth'

let socket;

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) =>{

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [cargandoPantalla, setCargandoPantalla] = useState(false)
    const [cargandoModal, setCargandoModal] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() =>{
        const obtenerProyectos = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        } 
        obtenerProyectos()
    }, [auth])

    useEffect(() =>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    function mostrarAlerta(msg = '', error = true, time=3000){
        if(msg){
            setAlerta({
                msg,
                error
            })
            setTimeout(() =>{
                setAlerta({})
            }, time)
        }else{
            setAlerta({})
        }
    }

    const submitProyecto = async proyecto =>{

        if(proyecto.id){
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto)
        }
       
    }

    const editarProyecto = async (proyecto) =>{
        try {
            let id
            let rest
            ({ id, ...rest } = proyecto)
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, rest, config)

            // * SINCRONIZAR EL STATE
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id ===  data._id ? data : proyectoState )
            setProyectos(proyectosActualizados)

            // * MOSTRAR ALERTA SUCCESS 
            mostrarAlerta('Proyecto Actualizado Correctamente', false)

            // * REDIRECCIONAR A LOS PROYECTOS
            setTimeout(() =>{
                navigate('/proyectos')
            }, 100)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async (proyecto) =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            // * SINCRONIZAR EL STATE
            setProyectos([...proyectos, data])

            // * MOSTRAR ALERTA SUCCESS
            mostrarAlerta('Proyecto Creado Correctamente', false)

            // * REDIRECCIONAR A LOS PROYECTOS
            setTimeout(() =>{
                navigate('/proyectos')
            }, 100)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id =>{
        setCargandoPantalla(true)
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error?.response?.data?.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
        setCargando(false)
        setCargandoPantalla(false)
    }

    const eliminarProyecto = async (id) =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/proyectos/${id}`, config)
            // * SINCRONIZAR EL STATE
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            // * REDIRECCIONAR A LOS PROYECTOS
            navigate('/proyectos')
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () =>{
        setAlerta({})
        setTarea({})
        setModalFormularioTarea(true)
    }

    const submitTarea = async tarea =>{
        if(tarea.id){
            await editarTarea(tarea)
            return ''
        }else{
            await nuevaTarea(tarea)
            return 'Creada'
        }
    }

    const editarTarea = async tarea =>{
        try {
            setCargandoModal(true)
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            setTarea(data)
            setModalFormularioTarea(false)
            mostrarAlerta('Tarea Actualizada', false)
            setCargandoModal(false)

            // * socket.io
            socket.emit('editar tarea', data)
        } catch (error) {
            console.log(error)
            setCargandoModal(false)
        }
    }

    const nuevaTarea = async tarea =>{
        try {
            setCargandoModal(true)
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas`, tarea, config)

            setModalFormularioTarea(false)
            mostrarAlerta('Tarea Creada', false)
            setCargandoModal(false)

            // * socket.io
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.log(error)
            setCargandoModal(false)
        }
    }

    const handleModalEditarTarea = tarea =>{
        setAlerta({})
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = (tarea) =>{
        setTarea(tarea)
        setModalEliminarTarea(true)
    }

    const eliminarTarea = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

            console.log('eliminada')
            setModalEliminarTarea(false)
            mostrarAlerta('Tarea Eliminada', false)
            
            // * socket.io
            socket.emit('eliminar tarea', tarea)
            setTarea({})
        } catch (error) {
            console.log(error)
            mostrarAlerta(error.response.data.msg)
        }
    }

    const submitColaborador = async (email, creador) =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos/colaboradores', {email, creador}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }
        setCargando(false)
    }

    const agregarColaborador = async email =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)

            //setColaborador(data)
            mostrarAlerta(data.msg, false, 5000)
            setColaborador({})
        } catch (error) {
            console.log(error.response)
            mostrarAlerta(error.response.data.msg)
        }
    }

    const handleModalEliminarColaborador = (colaborador) =>{
        setColaborador(colaborador)
        setModalEliminarColaborador(true)
    }

    const eliminarColaborador = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/colaboradores/${proyecto._id}`, {id: colaborador._id} , config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)
            setModalEliminarColaborador(false)
            mostrarAlerta('Colaborador Eliminado', false)
            setColaborador({})
        } catch (error) {
            setModalEliminarColaborador(false)
            console.log(error.response)
            mostrarAlerta(error.response.data.msg)
            setColaborador({})
        }
    }

    const completarTarea = async id =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            
            setTarea({})
            setAlerta({})

            // * socket.io
            socket.emit('completar tarea', data)
        } catch (error) {
            console.log(error)
            mostrarAlerta(error.response.data.msg)
        }
    }

    const handleBuscador = () =>{
        setBuscador(!buscador)
    }

    // * Socket.io

    const submitTareasProyecto = (tareaNueva) =>{
        // * AGREGA LA TAREA AL STATE DE PROYECTO
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]
        setProyecto(proyectoActualizado)
    }

    const eliminarTareaProyecto = tarea =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const editarTareaProyecto = tarea =>{
        // * SINCRONIZA LA TAREA ACTUALIZADA AL STATE DE PROYECTO
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const completarTareaProyecto = tarea =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    // * Cerrar sesión

    const cerrarSesionProyectos = () =>{
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }

    return (
        <ProyectosContext.Provider 
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto,
                obtenerProyecto,

                proyecto,
                cargando,
                cargandoPantalla,
                cargandoModal,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                setModalFormularioTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                setModalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                completarTarea,
                submitColaborador,
                colaborador,
                setColaborador,
                agregarColaborador,
                modalEliminarColaborador,
                setModalEliminarColaborador,
                handleModalEliminarColaborador,
                eliminarColaborador,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                editarTareaProyecto,
                completarTareaProyecto,
                cerrarSesionProyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export{
    ProyectosProvider
}

export default ProyectosContext