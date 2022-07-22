import { Link } from "react-router-dom"
import { slugify } from "../helpers"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"

const PreviewProyecto = ({proyecto}) => {

    const { auth } = useAuth()
    const { cargandoPantalla } = useProyectos()

    const {nombre, _id, cliente, creador } = proyecto

    return (
        !cargandoPantalla ?
        <div className="border-b p-5 flex flex-col md:flex-row gap-2 md:gap-0 justify-between">

            <div className="flex items-center gap-2">
                <p className="">
                    {nombre}
                    <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
                </p>

                {auth._id !== creador && 
                    <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>
                }
            </div>

            <Link
                to={_id}
                className="text-sky-600 hover:text-sky-900 uppercase text-sm font-bold transition-colors"
            >
                Ver Proyecto
            </Link>
        </div>
        :
        <div className="border-b p-5 flex flex-col md:flex-row gap-2 md:gap-0 justify-between">

            <div className="flex items-center gap-2 bg-stone-300 w-full md:w-1/3 h-6 animate-pulse rounded-md">
                
            </div>

            <p
                className="text-sky-600 hover:text-sky-900 uppercase text-sm font-bold transition-colors"
            >
                Ver Proyecto
            </p>
        </div>
    )
}

export default PreviewProyecto