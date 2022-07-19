import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { isEmailValid } from "../helpers"
import useAuth from "../hooks/useAuth"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth, isAuth } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los Campos Son Obligatorios',
                error: true
            })
            return;
        }
        if(!isEmailValid(email)){
            setAlerta({
                msg: 'El Email No es Válido',
                error: true
            })
            return;
        }

        try {
            const url = '/usuarios/login'
            const body = {
                email,
                password
            }
            const { data } = await clienteAxios.post(url, body)
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-sky-700 font-black text-6xl capitalize mb-10">Inicia Sesión y Administra tus <span className="text-slate-700">Proyectos</span></h1>

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
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password" 
                        type="password"
                        placeholder="Tu Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-600 w-full py-3 text-white font-bold text-xl uppercase rounded-md cursor-pointer transition-colors ease-in-out hover:bg-none hover:bg-sky-700 mb-5"
                />
            </form>

            <nav className="lg:flex lg:justify-around ">
                <p className="text-center mb-6 my-5 text-slate-500 text-lg">
                    ¿Aún no tienes una cuenta? {''}
                    <Link 
                    to='/registrar'
                    className="text-center text-sky-700 hover:text-sky-900 transition-colors font-bold"
                    >
                          Regístrate
                    </Link>
                </p>
                <Link 
                to='/olvide-password'
                className="block text-center my-5 text-sky-700 hover:text-sky-900 transition-colors text-lg font-bold"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </nav>
        </>
    )
}

export default Login