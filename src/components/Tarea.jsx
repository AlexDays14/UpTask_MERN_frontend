import { formatearFecha } from "../helpers"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin";

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea, cargandoPantalla } = useProyectos();
    const admin = useAdmin()

    const { _id, nombre, descripcion, fechaEntrega, prioridad, estado } = tarea

    return (
        !cargandoPantalla ?
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm capitalize w-2/3 md:w-full">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
                {admin && <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEditarTarea(tarea)}
                >
                    Editar
                </button>}

                <button
                    className={`${estado ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onDoubleClick={() => completarTarea(_id)}
                >
                    {estado ? 'Completa' : 'Incompleta'}
                </button>

                {admin && <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEliminarTarea(tarea)}
                >
                    Eliminar
                </button>}
            </div>
        </div>
        :

        <div className="border-b p-5 flex gap-3 justify-between items-center">
            <div className="flex-1 gap-1 lg:gap-0 flex flex-col items-start animate animate-pulse">
                <p className="mb-1 text-xl h-7 bg-stone-400 text-stone-400 w-full lg:w-1/2 rounded-md"></p>
                <p className="mb-1 text-sm h-5 bg-stone-300 lg:w-1/2 w-full rounded-md"></p>
                <p className="mb-1 text-sm h-5 bg-stone-300 lg:w-1/2 w-full rounded-md"></p>
                <p className="mb-1 bg-stone-400 text-stone-400 h-6"></p>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 animate-pulse">
                <div
                    className="bg-indigo-600 px-4 py-3 text-indigo-600 uppercase font-bold text-sm h-11 rounded-lg"
                >
                    Editar
                </div>

                <div
                    className={`bg-sky-600 px-4 py-3 text-sky-600 uppercase font-bold text-sm rounded-lg`}
                >
                    Completa
                </div>

                <div
                    className="bg-red-600 px-4 py-3 text-red-600 uppercase font-bold text-sm rounded-lg"
                >
                    Eliminar
                </div>
            </div>
        </div>
    )
}

export default Tarea