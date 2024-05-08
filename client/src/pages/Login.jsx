import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import '../styles/AuthForm.css'
import { useDispatch } from 'react-redux';
import { loginAsync } from '../store/authSlice';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()

    const onSubmit = async data => {
        dispatch(loginAsync(data))
    }

    const isLoginPage = location.pathname === '/login';

    return (
        <div className="card">
            <div className="auth_routes">
                <Link to="/login" className={`login ${isLoginPage ? 'active' : ''}`}>Login</Link>
                <Link to="/signup" className="register">Signup</Link>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.email ? 'invalid' : ''}`}
                        placeholder="Your email"
                        autoComplete="nope"
                        value={'basilierijulian@gmail.com'}
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
                        type="text"
                        className={`input ${errors.password ? 'invalid' : ''}`}
                        placeholder="Your password"
                        autoComplete="nope"
                        value={'123'}
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />
                    <label className="label">Password</label>
                    {errors.password && (
                        <div className="error">{errors.password.message}</div>
                    )}
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
            <Link to='/forgot' className="fp">Forgot password?</Link>
        </div>
    );
};

export default Login;
