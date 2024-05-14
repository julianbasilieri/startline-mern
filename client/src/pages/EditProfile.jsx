import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { updateUserAsync } from '../store/authSlice';
import '../styles/Form.css'
import '../styles/Profile.css'

import TextareaAutosize from 'react-textarea-autosize';
import { getUserAsync } from '../store/userSlice';
import axios from 'axios';

const EditProfile = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { user } = useSelector((state) => state.auth);
    const { userComplete } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUser() {
            try {
                { console.log('--------------------') }
                { console.log(user) }

                if (user) {
                    await dispatch(getUserAsync(user.username))
                    console.log('userComplete', userComplete)
                    // const { data } = await axios.get(`http://localhost:4000/api/users?username=${user.username}`)
                    const usuario = userComplete
                    const fechaFormateada = usuario.birthdate.slice(0, 10)
                    setValue('photo', usuario.photo);
                    setValue('firstname', usuario.firstname);
                    setValue('middlename', usuario.middlename);
                    setValue('lastname', usuario.lastname);
                    setValue('username', usuario.username);
                    setValue('email', usuario.email);
                    setValue('birthdate', fechaFormateada);
                    setValue('university', usuario.university);
                    setValue('info', usuario.info);
                }
            } catch (error) {
                console.error(error)
            }
        }

        getUser()
    }, [user]);

    const onSubmit = async data => {
        try {
            if (data.birthdate) {
                data.birthdate = new Date(data.birthdate).toISOString();
            }

            await dispatch(updateUserAsync(data))
            navigate('/profile')
        } catch (error) {
            console.error(error.response.data)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValue(name, value);
    }

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0]
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'axji3fv4');

            const response = await axios.post('https://api.cloudinary.com/v1_1/dy30jccdy/image/upload', formData);
            const imageUrl = response.data.secure_url;

            await dispatch(updateUserAsync({ photo: imageUrl }))
            console.log(user)
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };


    return (
        <div className="card">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="section">
                    <div className='user-image'>
                        <img className='profile-image' src={userComplete ? userComplete.photo : ''} alt="User Profile" />
                    </div>
                </div>
                <div className="section">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <label className="label">Subir foto de perfil</label>
                </div>
                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.firstname ? 'invalid' : ''}`}
                        placeholder="First Name"
                        autoComplete='nope'
                        {...register("firstname", {
                            required: "Firstname is required",
                        })}
                        onChange={handleChange}
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
                        placeholder="Middlename"
                        autoComplete="nope"
                        onChange={handleChange}
                        {...register("middlename")}
                    />
                    <label className="label">Middlename</label>
                </div>

                <div className="section">
                    <input
                        type="text"
                        className={`input ${errors.lastname ? 'invalid' : ''}`}
                        placeholder="Your lastname"
                        autoComplete="nope"
                        {...register("lastname", {
                            required: "Lastname is required",
                        })}
                        onChange={handleChange}
                    />
                    <label className="label">Lastname</label>
                    {errors.lastname && (
                        <div className="error">{errors.lastname.message}</div>
                    )}
                </div>

                <div className="section">
                    <input
                        type="text"
                        className='input'
                        placeholder="Your username"
                        autoComplete="nope"
                        disabled
                        {...register("username")}
                    />
                    <label className="label">Username</label>
                </div>

                <div className="section">
                    <input
                        type="text"
                        className='input'
                        placeholder="Your email"
                        autoComplete="nope"
                        disabled
                        {...register("email")}
                    />
                    <label className="label">Email</label>
                </div>

                <div className="section">
                    <input
                        type="text"
                        className='input'
                        placeholder="Your email"
                        autoComplete="nope"
                        value='*************'
                        disabled
                    />
                    <label className="label">Password</label>
                    <button onClick={() => navigate('/edit-password')}>Edit Contraseña</button>
                </div>
                <div className="section">
                    <input
                        type="date"
                        className='input'
                        placeholder="birthdate"
                        autoComplete="nope"
                        {...register("birthdate")}
                    />
                    <label className="label">Birthdate</label>
                </div>

                <div className="section">
                    <input
                        type="text"
                        className='input'
                        placeholder="university"
                        autoComplete="nope"
                        {...register("university")}
                    />
                    <label className="label">University</label>
                </div>

                <div className="section">
                    <TextareaAutosize
                        type="text"
                        className='textarea'
                        autoComplete="nope"
                        {...register("info")}
                    />
                    <label className="label">Personal information</label>
                </div>

                <button type="submit" className="submit-button">Save Changes</button>
                <button className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProfile;
