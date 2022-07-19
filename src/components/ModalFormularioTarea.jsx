import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import { formatearFecha } from '../helpers'

const ModalFormularioTarea = () => {

    const PRIORIDAD = [
        'Baja',
        'Media',
        'Alta'
    ]

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')

    const params = useParams()

    const { modalFormularioTarea, handleModalTarea, setModalFormularioTarea, mostrarAlerta, alerta, submitTarea, cargandoModal, tarea } = useProyectos();

    useEffect(() =>{
        if(tarea?._id){
            setId(tarea?._id)
            setNombre(tarea?.nombre)
            setDescripcion(tarea?.descripcion)
            setFechaEntrega(tarea?.fechaEntrega?.split('T')[0])
            setPrioridad(tarea?.prioridad)
            return
        }
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
        
    }, [tarea])

    const handleSubmit = async e =>{
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, prioridad].includes('')){
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }

        const respuesta = await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id})
        // * RESETEAR FORM
        if(respuesta){
            setNombre('')
            setDescripcion('')
            setFechaEntrega('')
            setPrioridad('')
        }
    }

    const { msg, error } = alerta
 
    return (
        <Transition.Root show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setModalFormularioTarea(false)}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-11/12 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setModalFormularioTarea(false)}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 sm:mt-0  w-full">
                                    <Dialog.Title as="h3" className="text-4xl font-bold text-gray-900 mb-5">
                                        {id ? 'Editar Tarea' : 'Crear Tarea'}
                                    </Dialog.Title>

                                    {msg && error && <Alerta alerta={alerta} />}

                                    <form
                                        className=' mb-5'
                                        onSubmit={handleSubmit}
                                    >
                                        <div className='mb-5'>
                                            <label htmlFor="nombre" className='text-gray-700 uppercase text-sm font-bold block'>Nombre Tarea</label>
                                            <input
                                                id='nombre'
                                                type="text" 
                                                className='border-2 w-full p-2 mt-4 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline text-start'
                                                placeholder='Nombre de la Tarea'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label htmlFor="descripcion" className='text-gray-700 uppercase text-sm font-bold block'>Nombre Descripción</label>
                                            <textarea
                                                id='descripcion'
                                                className='border-2 w-full h-40 p-2 mt-4 placeholder-gray-400 rounded-md resize-y focus:outline-sky-600 focus:outline text-start'
                                                placeholder='Descripción de la Tarea'
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label htmlFor="fecha-entrega" className='text-gray-700 uppercase text-sm font-bold block'>Fecha Entrega</label>
                                            <input
                                                id='fecha-entrega'
                                                type="date" 
                                                className='border-2 block w-full p-2 mt-4 rounded-md focus:outline-sky-600 focus:outline'
                                                value={fechaEntrega}
                                                onChange={e => setFechaEntrega(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label htmlFor="prioridad" className='text-gray-700 uppercase text-sm font-bold block'>Prioridad Tarea</label>
                                            <select
                                                id='prioridad'
                                                className='border-2 w-full p-2 mt-4 rounded-md focus:outline-sky-600 focus:outline'
                                                value={prioridad}
                                                onChange={e => setPrioridad(e.target.value)}
                                            >
                                                <option value="">-- Seleccione --</option>
                                                {PRIORIDAD.map((opcion) => (
                                                    <option key={opcion} value={opcion}>{opcion}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <input 
                                            type="submit" 
                                            className={`mt-5 bg-sky-600 hover:bg-sky-700 ${cargandoModal && 'bg-sky-200 hover:bg-sky-200 cursor-not-allowed'} w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-xl`}
                                            value={id ? "Guardar Cambios" : "Crear Tarea"}
                                            disabled={cargandoModal}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea