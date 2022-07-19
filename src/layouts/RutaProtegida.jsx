import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    return (
        <>
            {!cargando && (auth._id ? 
            (<div>
                <Header
                    
                />

                <div
                    className='md:flex md:h-screen md:pt-20'
                >
                    <Sidebar/>

                    <main className='py-10 px-6 md:p-10 flex-1 md:overflow-y-scroll'>
                        <Outlet/>
                    </main>
                </div>
            </div> 
            )
            : <Navigate to="/" />
            )}
        </>
    )
}

export default RutaProtegida