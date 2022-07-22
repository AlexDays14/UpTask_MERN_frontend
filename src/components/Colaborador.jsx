import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const { handleModalEliminarColaborador, cargandoPantalla } = useProyectos()

    const { nombre, email } = colaborador

    return (
        !cargandoPantalla ?
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p>{nombre}</p>
                <p className='text-sm text-gray-700'>{email}</p>
            </div>
            <div>
                <button
                    type='button'
                    className='bg-red-600 px-4 py-3 uppercase text-white font-bold text-sm rounded-lg'
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        </div>
        :

        <div className='border-b p-5 flex gap-3 lg:gap-64 justify-between items-center'>
            <div className='flex-1 animate-pulse'>
                <div className='lg:w-1/2 h-6 mb-2 bg-stone-700 rounded-md'></div>
                <div className='lg:w-1/3 h-8 mb-1 bg-stone-400 rounded-md animate-pulse'></div>
            </div>
            <div className='animate-pulse'>
                <div
                    type='button'
                    className='bg-red-600 px-4 py-3 uppercase text-red-600 font-bold text-sm rounded-lg justify-end w-content'
                >
                    Eliminar
                </div>
            </div>
        </div>
    )
}

export default Colaborador