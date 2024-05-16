import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoaderDNA from './LoaderDNA';

const ProtectedRouteUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    
    const validatingUser = async () => {
        try {
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error('Debes iniciar sesion')
            return navigate("/login");
        }
        validatingUser();
    }, []);

    return (
        <>
            {
                loading
                    ? <LoaderDNA />
                    : <Outlet />
            }
        </>
    )
}

export default ProtectedRouteUser