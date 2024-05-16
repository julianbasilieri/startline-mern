import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singUpAsync } from '../store/authSlice';
import '../styles/Form.css'

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async data => {
        try {
            await dispatch(singUpAsync(data))
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    const isSignupPage = location.pathname === '/signup';

    return (
        <div className="card">
            <div className="auth_routes">
                <Link to="/login" className="login">Login</Link>
                <Link to="/signup" className={`register ${isSignupPage ? 'active' : ''}`}>
                    Signup</Link>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.firstname ? 'invalid' : ''}`}
                        placeholder="First Name"
                        autoComplete='nope'
                        {...register("firstname", {
                            required: "Firstname is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Firstname cannot contain numbers"
                            }
                        })}
                    />
                    <label className="label">Firstname</label>
                    <label className={`label ${errors.firstname ? 'invalid' : ''}`}>Firstname</label>
                    {errors.firstname && (
                        <div className="error">{errors.firstname.message}</div>
                    )}
                </div>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.middlename ? 'invalid' : ''}`}
                        placeholder="Middle name"
                        autoComplete="nope"
                        {...register("middlename", {
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Middlename cannot contain numbers"
                            }
                        })}
                    />
                    <label className="label">Middlename</label>
                    {errors.middlename && (
                        <div className="error">{errors.middlename.message}</div>
                    )}
                </div>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.lastname ? 'invalid' : ''}`}
                        placeholder="Your lastname"
                        autoComplete="nope"
                        {...register("lastname", {
                            required: "Lastname is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Lastname cannot contain numbers"
                            }
                        })}
                    />
                    <label className="label">Lastname</label>
                    {errors.lastname && (
                        <div className="error">{errors.lastname.message}</div>
                    )}
                </div>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.username ? 'invalid' : ''}`}
                        placeholder="Your username"
                        autoComplete="nope"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username must be at least 5 characters long"
                            },
                            maxLength: {
                                value: 20,
                                message: "Username cannot exceed 20 characters"
                            }
                        })}
                    />
                    <label className="label">Username</label>
                    {errors.username && (
                        <div className="error">{errors.username.message}</div>
                    )}
                </div>
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
                <div className="section">
                    <input
                        type="password"
                        className={`input ${errors.password ? 'invalid' : ''}`}
                        placeholder="Your password"
                        autoComplete="nope"
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />
                    <label className="label">Password</label>
                    {errors.password && (
                        <div className="error">{errors.password.message}</div>
                    )}
                </div>
                <div className="section">
                    <input
                        type="password"
                        className={`input ${errors.confirmPassword ? 'invalid' : ''}`}
                        placeholder="Your confirmPassword"
                        autoComplete="nope"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: value =>
                                value === getValues("password") || "Passwords do not match"
                        })}
                    />
                    <label className="label">Confirm Password</label>
                    {errors.confirmPassword && (
                        <div className="error">{errors.confirmPassword.message}</div>
                    )}
                </div>
                <button type="submit" className="submit-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;