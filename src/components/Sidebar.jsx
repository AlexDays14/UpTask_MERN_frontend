import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth } = useAuth()

    return (
        <aside id='aside' className={`md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 border-r-2 shadow-md bg-white`}>
            <p className='text-xl'>Hola <span className='font-semibold'>{auth.nombre},</span></p>

            <Link
                to="crear-proyecto"
                className='bg-sky-600 hover:bg-sky-700 transform hover:-translate-y-1 transition-all flex justify-center gap-2 p-3 text-white uppercase font-bold mt-5  rounded-lg'
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nuevo Proyecto
            </Link>
        </aside>
    )
}

export default Sidebar