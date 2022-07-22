import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() =>{
        if(params.id){
            setId(params.id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [])


    async function handleSubmit(e){
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

        // * Resetear el formulario
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const { msg } = alerta

    return (
        <form 
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md'
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta}/>}
            <div className='mb-5'>
                <label 
                    htmlFor="nombre"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre
                </label>

                <input 
                    id='nombre'
                    type="text"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline' 
                    placeholder='Nombre de tu Proyecto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="descripcion"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Descripción
                </label>

                <textarea 
                    id='descripcion'
                    type="text"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline' 
                    placeholder='Descripción de tu Proyecto'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                ></textarea>
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="fecha-entrega"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Fecha de Entrega
                </label>

                <input 
                    id='fecha-entrega'
                    type="date"
                    className='border block w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline' 
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="cliente"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Cliente
                </label>

                <input 
                    id='cliente'
                    type="text"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline' 
                    placeholder='¿Para quién es el Proyecto?'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                className='mt-5 w-full text-white bg-sky-600 hover:bg-sky-700 uppercase p-3 rounded-xl font-bold cursor-pointer transition-all'
            />
            
        </form>
    )
}

export default FormularioProyecto