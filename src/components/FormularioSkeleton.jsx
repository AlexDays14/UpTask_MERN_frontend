
const FormularioSkeleton = () => {


    return (
        <form 
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md'
        >
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
                    className='border w-full p-2 mt-2 bg-stone-200 rounded-md animate-pulse' 
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="descripcion"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Descripción
                </label>

                <div 
                    id='descripcion'
                    type="text"
                    className='border w-full p-10 mt-2 bg-stone-200 rounded-md animate-pulse' 
                ></div>
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
                    className='border w-full p-2 mt-2 bg-stone-200 rounded-md animate-pulse' 
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
                    className='border w-full p-2 mt-2 bg-stone-200 rounded-md animate-pulse' 
                />
            </div>

            <input 
                type="button" 
                value="Crear Proyecto"
                className='w-full text-sky-600 bg-sky-600 uppercase p-3 rounded-xl font-bold transition-all animate-pulse'
            />
            
        </form>
    )
}

export default FormularioSkeleton