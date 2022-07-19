import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
import {scroller} from 'react-scroll'

const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const { mostrarAlerta, alerta, submitColaborador, cargandoPantalla, proyecto } = useProyectos()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(email == ''){
            mostrarAlerta('El email es obligatorio')
            return
        }

        await submitColaborador(email, proyecto.creador)
        
    }

    //${cargandoModal && 'bg-sky-200 hover:bg-sky-200 cursor-not-allowed'}
    //disabled={cargandoModal}

    const { msg } = alerta

    return (
        !cargandoPantalla ? (
            <form
                className="bg-white py-10 px-5 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                {msg && <Alerta alerta={alerta} />}
                {proyecto?._id && (<>
                    <div className='mb-5'>
                        <label htmlFor="email" className='text-gray-700 uppercase text-sm font-bold block'>Email Colaborador</label>
                        <input
                            id='email'
                            type="email" 
                            className='border-2 w-full p-2 mt-4 placeholder-gray-400 rounded-md focus:outline-sky-600 focus:outline'
                            placeholder='Email del Usuario'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        className={`bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-xl`}
                        value="Buscar Colaborador"
                    />
                </>)
                }
            </form>)
        : (
            <form
                className="bg-white py-10 px-5 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow"
            >
                <div className="">
                <div className='mb-5'>
                    <label className='text-gray-700 uppercase text-sm font-bold block animate-none'>Email Colaborador</label>
                    <div
                        className=' w-full p-6 mt-4 bg-stone-200 rounded-md animate-pulse'
                    ></div>
                </div>

                <div 
                    type="button" 
                    className={`bg-sky-600 w-full p-6 font-bold rounded-xl animate-pulse`}
                />
                </div>
            </form>)
    )
}

export default FormularioColaborador