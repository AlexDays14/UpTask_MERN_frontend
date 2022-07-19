import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'
import Busqueda from './Busqueda'

const Header = () => {

    const { cerrarSesionAuth } = useAuth()
    const { handleBuscador, cerrarSesionProyectos } = useProyectos()

    const handleCerrarSesion = () =>{
        cerrarSesionAuth();
        cerrarSesionProyectos();
        localStorage.removeItem('token')
    }

    return (
        <header className='px-4 py-5 bg-white border-b  md:absolute md:top-0 w-full'>
            <div className='md:flex md:justify-between'>
                <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>UpTask</h2>

                <div className='flex flex-col md:flex-row items-center gap-5'>
                    <button
                        type='button'
                        className='font-bold uppercase flex items-center gap-1 hover:text-cyan-800 transition-colors'
                        onClick={handleBuscador}
                    >
                        <span className='hidden md:inline'>Buscar Proyecto</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <Link
                        to="/proyectos"
                        className='font-bold uppercase'
                    >Proyectos</Link>

                    <button
                        type='button'
                        className='text-white text-sm bg-rojo p-3 rounded-md uppercase font-bold'
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>

                    <Busqueda/>
                </div>
            </div>
        </header>
    )
}

export default Header