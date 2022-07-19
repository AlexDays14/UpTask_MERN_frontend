import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { Link, useParams } from "react-router-dom"
import {Element} from 'react-scroll'

const NuevoColaborador = () => {

    const params = useParams()
    const { obtenerProyecto, proyecto, cargando, cargandoPantalla, colaborador, agregarColaborador } = useProyectos()

    useEffect(() =>{
        obtenerProyecto(params.id)
    }, [])
    
    return (
        !cargandoPantalla ? 
        (<>
            {
            // * BREADCRUMB
            }
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
                        to={`/proyectos/${params.id}`}
                        className="text-sky-700 hover:text-sky-800 w-1/3 md:w-auto whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                        {proyecto.nombre}
                    </Link>
                    <span className="font-bold text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </>)
                }
            </div>

            <h1 className="text-4xl font-black">Añadir Colaborador(a)</h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador/>
            </div>

            <Element name="colaborador">
                {cargando && !colaborador?._id ? '' : colaborador?._id && (
                    <div className="flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow">
                            <h2 className="text-center text-2xl font-bold mb-5 md:mb-10">Resultado:</h2>

                            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                                <p className="">{colaborador.nombre}</p>

                                <button
                                    type="button"
                                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-center"
                                    onClick={() => agregarColaborador({email: colaborador.email})}
                                >
                                    Agregar al Proyecto
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }
            </Element>
        </>)
        : (
            <>
                <div className="text-gray-300 animate-pulse rounded-md w-1/4 h-6 bg-gray-300 mb-5"></div>

                <div className="bg-stone-200 animate-pulse text-4xl w-3/4 rounded-md h-10"></div>

                <div className="mt-10 flex justify-center">
                    <FormularioColaborador/>
                </div>
            </>
        )
    )
}

export default NuevoColaborador