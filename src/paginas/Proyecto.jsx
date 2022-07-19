import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from 'socket.io-client'

let socket;

const Proyecto = () => {

    const {id} = useParams();

    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, editarTareaProyecto, completarTareaProyecto } = useProyectos()
    const admin = useAdmin()

    /* useEffect(() =>{
        obtenerProyecto(id)
    }, []) */
    useEffect(() =>{
        obtenerProyecto(id)
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', id)
    }, [id])

    useEffect(() =>{
        socket.on('tarea agregada', (tareaNueva) =>{
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva)
            }
        })

        socket.on('tarea eliminada', tareaEliminada =>{
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)
            }
        })

        socket.on('tarea editada', tareaEditada =>{
            if(tareaEditada.proyecto._id === proyecto._id){
                editarTareaProyecto(tareaEditada)
            }
        })

        socket.on('tarea completada', tareaCompletada =>{
            if(tareaCompletada.proyecto === proyecto._id){
                completarTareaProyecto(tareaCompletada)
            }
        })
    })

    const { _id, nombre, descripcion, fechaEntrega, cliente, tareas, colaboradores} = proyecto

    const { msg, error } = alerta;

    return (
        !cargando ? (
            <>
                <div className="text-gray-500 inline-flex items-center mb-5 gap-1">
                    <Link
                        to={`/proyectos`}
                        className="text-sky-700 hover:text-sky-800"
                    >
                        Proyectos
                    </Link>
                    <span className="font-bold text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
                
                <div className="flex flex-wrap gap-5 justify-between">
                    <h1 className="font-black text-4xl">{_id ? nombre : 'No Encontrado'}</h1>
                    
                    {admin && <div 
                        className="flex flex-1 justify-center md:justify-end items-center transition-all "
                    >
                        <Link
                            to={`/proyectos/editar/${id}`}
                            className="flex items-center gap-2 uppercase font-bold text-gray-400 hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>

                            Editar
                        </Link>
                    </div>}

                </div>

                {admin && <button
                    onClick={handleModalTarea}
                    type="button"
                    className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-500 text-white text-center transition-colors"
                >
                    + Nueva Tarea
                </button>}

                
                {_id ? <p className="font-bold text-xl mt-10 mb-5">Tareas del Proyecto</p> : <p className="mt-10 mb-5"></p>}

                <div className="w-full md:w-3/4 lg:w-9/12 mx-auto">
                    {msg && error && <Alerta alerta={alerta} />}
                </div>

                {_id &&
                <>
                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto?.tareas?.length ? 
                        proyecto?.tareas?.map(tarea => (
                            <Tarea key={tarea._id} tarea={tarea} />
                        )) 
                    : <p className="text-center my-5 p-10">Aún No Hay Tareas</p>
                    }
                </div>

                {admin && <div className="flex items-center justify-between mt-10">
                    <p className="font-bold text-xl">Colaboradores</p>

                    <Link 
                        to={`/proyectos/nuevo-colaborador/${id}`}
                        className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer transition-all uppercase font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>

                        Añadir
                    </Link>
                </div>}

                {admin && <div className="bg-white shadow mt-10 mb-10 rounded-lg">
                    {colaboradores?.length ? 
                        colaboradores.map(colaborador => (
                            <Colaborador key={colaborador._id} colaborador={colaborador}/>
                        )) 
                    : <p className="text-center my-5 p-10">
                        Agrega Colaboradores
                      </p>
                    }
                </div>}
                </>}

                <ModalFormularioTarea/>
                <ModalEliminarTarea/>
                <ModalEliminarColaborador/>
            </>
        ) :(
            <>
                <div className="animate-pulse flex justify-between">
                    <div className="bg-stone-200 text-4xl w-3/4 rounded-md h-10"></div>

                    <div className="flex items-center gap-2 bg-stone-300 text-gray-300 rounded-md h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>

                        <div
                            className="uppercase font-bold"
                        >
                            Editar
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default Proyecto