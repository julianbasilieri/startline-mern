import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditPassword = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const onSubmit = async data => {
        await axios.get(`http://localhost:4000/api/auth/change-password/${token}/${data.password}`)
    }

    return (
        <div className="card">

            <div className="back-route">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} className='back-arrow' />
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <input
                        type="text"
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
                        type="text"
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
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default EditPassword;
