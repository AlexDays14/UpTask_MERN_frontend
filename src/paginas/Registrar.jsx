import clienteAxios from "../config/clienteAxios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [alerta, setAlerta] = useState({})

    async function handleSubmit(e){
        e.preventDefault()
        if([nombre, email, password, password2].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        if(password !== password2){
            setAlerta({
                msg: 'Las Contraseñas Deben Ser Iguales',
                error: true
            })
            return;
        }
        if(password.length < 6){
            setAlerta({
                msg: 'La Contraseña es Muy Corta',
                error: true
            })
            return;
        }
        setAlerta({})

        // Crear Cuenta
        try {
            const body = {
                nombre,
                email,
                password
            }
            const { data } = await clienteAxios.post('/usuarios', body)
            setAlerta({
                msg: data.msg
            })

             setNombre('')
             setEmail('')
             setPassword('')
             setPassword2('')
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
            <h1 className="bg-clip-text text-transparent bg-linear-rojo font-black text-6xl capitalize mb-10">Crea Tu Cuenta y Administra tus <span className="text-slate-700">Proyectos</span></h1>

            {msg && <Alerta alerta={alerta}/>}

            <form 
                className="my-10 bg-white shadow rounded-lg px-5 md:px-10 py-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-semibold" htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        name="nombre" 
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold"
                        onChange={e => setNombre(e.target.value)}
                        value={nombre} 
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-semibold" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email" 
                        type="email"
                        placeholder="Tu Email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold"
                        onChange={e => setEmail(e.target.value)}
                        value={email}  
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
                        onChange={e => setPassword(e.target.value)}
                        value={password}  
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Repetir Contraseña</label>
                    <input
                        id="password2"
                        name="password2" 
                        type="password"
                        placeholder="Confirma tu Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold"
                        onChange={e => setPassword2(e.target.value)}
                        value={password2}  
                    />
                </div>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-rojo w-full py-3 text-white font-bold text-xl uppercase rounded-md cursor-pointer transition-colors ease-in-out hover:bg-none hover:bg-rojo-claro mb-5"
                />
            </form>

            <nav className="lg:flex lg:justify-around ">
                <p className="text-center mb-6 my-5 text-slate-500 text-lg">
                    ¿Ya tienes una cuenta? {''}
                    <Link 
                    to='/'
                    className="text-center text-rojo hover:text-red-600 transition-colors font-bold"
                    >
                        Inicia Sesión
                    </Link>
                </p>
                <Link 
                to='/olvide-password'
                className="block text-center my-5 text-rojo hover:text-red-600 transition-colors text-lg font-bold"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </nav>
        </>
    )
}

export default Registrar