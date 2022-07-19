import swal from 'sweetalert'
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import FormularioProyecto from "../components/FormularioProyecto";
import FormularioSkeleton from '../components/FormularioSkeleton'
import useProyectos from "../hooks/useProyectos";

const EditarProyecto = () => {

    const {id} = useParams();

    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos()

    const { nombre, descripcion, fechaEntrega, cliente} = proyecto
    useEffect(() =>{
        obtenerProyecto(id)
    }, [])

    const handleClick = () =>{
        swal({
            title: "¿Eliminar este Proyecto?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                await eliminarProyecto(id)
                swal({
                    title: "¡Proyecto Eliminado Correctamente!",
                    icon: "success",
                });
            }
        });
    }

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
                    {proyecto?._id && (
                    <>
                        <Link
                            to={`/proyectos/${id}`}
                            className="text-sky-700 hover:text-sky-800 w-1/3 md:w-auto whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                            {nombre}
                        </Link>
                        <span className="font-bold text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </>
                    )}
                </div>
                <div className="flex flex-wrap gap-5 justify-between">
                    <h1 className="font-black text-4xl">Editar Proyecto</h1>

                    <div 
                        className="flex flex-1 justify-center md:justify-end items-center transition-all"
                    >

                        <button
                            onClick={handleClick}
                            className="flex items-center gap-2 uppercase font-bold text-gray-400 hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            
                            Eliminar
                        </button>
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <FormularioProyecto/>
                </div>
            </>
        ) : (

            <>
            <div className="text-gray-300 animate-pulse rounded-md w-1/4 h-6 bg-gray-300 mb-5"></div>

                <div className="flex justify-between animate-pulse">
                    <div className="bg-stone-200 w-3/4 rounded-md h-10"></div>

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

                <div className="mt-10 flex justify-center">
                    <FormularioSkeleton/>
                </div>
            </>
        )
    )
}

export default EditarProyecto