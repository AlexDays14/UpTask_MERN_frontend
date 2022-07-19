import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    const { id } = useParams()

    useEffect(() =>{
        const confirmarCuenta = async () =>{
            try {
                const url = `/usuarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmarCuenta();
    }, [])

    const { msg } = alerta
    
    return (
        <>
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-700 font-black text-6xl capitalize mb-10">Confirma tu cuenta y comienza a crear tus <span className="text-slate-600">Proyectos</span></h1>

            <div className='mt-20 md:mt-10 shadow-lg px-3 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} color={'green'}/>}

                {cuentaConfirmada && (
                    <Link 
                    to='/'
                    className="block text-center uppercase text-green-600 hover:text-green-700 transition-colors font-bold"
                    >
                        Inicia Sesión
                    </Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta