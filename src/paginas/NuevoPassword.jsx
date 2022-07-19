import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { token } = useParams()

    useEffect(() =>{
        const comprobarToken = async () =>{
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                console.log(error.response)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    async function handleSubmit(e){
        e.preventDefault();

        if([password, password2].includes('')){
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

        try {
            const url = `/usuarios/olvide-password/${token}`
            const body = {
                password
            }
            const { data } = await clienteAxios.post(url, body)
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
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
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600 font-black text-6xl capitalize mb-10">Reestablece tu Password y no pierdas acceso a tus <span className="text-slate-700">Proyectos</span></h1>

            {msg && <Alerta alerta={alerta}/>}
            {tokenValido && (
                <form 
                    className="my-10 bg-white shadow rounded-lg px-5 md:px-10 py-10"
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nueva Contraseña</label>
                        <input
                            id="password1"
                            name="password1" 
                            type="password"
                            placeholder="Tu Nueva Contraseña"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="off"
                            disabled={passwordModificado && true}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Nueva Contraseña</label>
                        <input
                            id="password2"
                            name="password2" 
                            type="password"
                            placeholder="Confirma Tu Nueva Contraseña"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 transition-all focus:font-bold" 
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            autoComplete="off"
                            disabled={passwordModificado && true}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar Nueva Contraseña"
                        className={`bg-amber-600 w-full py-3 text-white font-bold text-xl uppercase rounded-md cursor-pointer transition-colors ease-in-out hover:bg-none ${!passwordModificado ? 'hover:bg-amber-700': 'cursor-not-allowed'} mb-5`}
                        disabled={passwordModificado && true}
                    />
                </form>
            )}

            {passwordModificado && (
                <Link 
                to='/'
                className="block mx-auto text-center uppercase text-amber-600 hover:text-amber-700 transition-colors font-bold"
                >
                    Inicia Sesión
                </Link>
            )}
            
        </>
    )
}

export default NuevoPassword