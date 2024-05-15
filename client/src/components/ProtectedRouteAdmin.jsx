import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { isAdminAsync } from '../store/authSlice';
import LoaderDNA from './LoaderDNA';

const ProtectedRouteAdmin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()


    const validatingUser = async () => {
        try {
            const res = await dispatch(isAdminAsync())
            if (!res.payload.success) {
                toast.error('No tienes permisos')
                return navigate("/");
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error('Tienes que registrarte')
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

export default ProtectedRouteAdmin