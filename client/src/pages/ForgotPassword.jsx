import '../styles/Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { forgotPassword } from '../store/authSlice';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async data => {
        try {
            dispatch(forgotPassword(data))
        } catch (error) {
            console.error(error.response.data)
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    return (
        <div className="card">
            <div className="back-route">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} className='back-arrow' />
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.email ? 'invalid' : ''}`}
                        placeholder="Your email"
                        autoComplete="nope"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <label className="label">Email</label>
                    {errors.email && (
                        <div className="error">{errors.email.message}</div>
                    )}
                </div>
                <button type="submit" className="submit-button">Recuperar contraseña</button>
            </form>
        </div>
    );
};

export default ForgotPassword;