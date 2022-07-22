import {useEffect} from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'
import Alerta from '../components/Alerta'

const Proyectos = () => {

    const { proyectos, alerta, cargandoPantalla } = useProyectos()

    const { msg, error } = alerta

    return (
        !cargandoPantalla ?
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>

            <div className='mt-10'>
                { msg && error && <Alerta alerta={alerta}/>  }
            </div>
            
            <div className='bg-white shadow mt-10 rounded-lg '>
                {proyectos.length ? 
                    proyectos.map(proyecto => (
                        <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
                    ))
                : <p className='text-center text-gray-600 uppercase p-5'>Aún No Tienes Proyectos. Crea Un Proyecto</p>
                }
            </div>

        </>
        : 
        <div className='animatepulse'>
            <div className='bg-stone-200 w-full md:w-3/4 rounded-md h-10 animate-pulse'></div>

            <div className='mt-10'>
                { msg && error && <Alerta alerta={alerta}/>  }
            </div>
            
            <div className='bg-white shadow mt-10 rounded-lg '>
                {proyectos.length ? 
                    proyectos.map(proyecto => (
                        <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
                    ))
                : <p className='text-center text-gray-600 uppercase p-5'>Aún No Tienes Proyectos. Crea Un Proyecto</p>
                }
            </div>

        </div>
    )
}

export default Proyectos