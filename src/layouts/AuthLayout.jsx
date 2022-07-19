import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

const AuthLayout = () => {

    const { auth, cargando } = useAuth()

    return (
        !cargando && (!auth._id ? 
        <>
            <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
                <div className="md:w-2/3 lg:w-1/2">
                    <Outlet/>
                </div>
            </main>
        </>
        : <Navigate to="/proyectos"/>)

    )
}

export default AuthLayout