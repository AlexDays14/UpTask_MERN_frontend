import {useState} from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import { isEmailValid } from '../helpers'
import clienteAxios from '../config/clienteAxios'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    async function handleSubmit(e){
        e.preventDefault();

        if(!email){
            setAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            })
            return
        }
        if(!isEmailValid(email)){
            setAlerta({
                msg: 'El Email No es Válido',
                error: true
            })
            return
        }
        setAlerta({})

        try {
            const body = {
                email
            }
            const { data } = await clienteAxios.post('/usuarios/olvide-password', body)
            setAlerta({
                msg: data.msg
            })
            console.log(data)
        } catch (error) {
            console.log(error.response)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
        <h1 className="bg-clip-text text-transparent bg-linear-morado font-black text-6xl capitalize mb-10">Recupera Tu Acceso y no Pierdas tus <span className="text-slate-900">Proyectos</span></h1>

        {msg && <Alerta alerta={alerta}/>}

        <form 
            className="my-10 bg-white shadow rounded-lg px-5 md:px-10 py-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-semibold" htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email" 
                    type="email"
                    placeholder="Tu Email"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Enviar Instrucciones"
                className="bg-morado w-full py-3 text-white font-bold text-xl uppercase rounded-md cursor-pointer transition-colors ease-in-out hover:bg-none hover:bg-rojo-claro mb-5"
            />
        </form>

        <nav className="lg:flex lg:justify-around ">
            <p className="text-center mb-6 my-5 text-slate-500 text-lg">
                ¿Ya tienes una cuenta? {''}
                <Link 
                to='/'
                className="text-center text-morado hover:text-indigo-900 transition-colors font-bold"
                >
                      Inicia Sesión
                </Link>
            </p>
            <p className="text-center mb-6 my-5 text-slate-500 text-lg">
                ¿Aún no tienes una cuenta? {''}
                <Link 
                    to='/registrar'
                    className="text-center my-5 text-morado hover:text-indigo-900 transition-colors font-bold"
                >
                    Regístrate
                </Link>
            </p>
        </nav>
    </>
    )
}

export default OlvidePassword