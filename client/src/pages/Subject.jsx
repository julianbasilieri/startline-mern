import { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectList from '../components/SubjectList';
import { useSelector } from 'react-redux';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);

    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        // Función para cargar los temas al cargar el componente
        const fetchSubjects = async () => {
            try {
                if (auth.user) {
                    const res = await axios.get('http://localhost:4000/api/subjects', {
                        headers: {
                            Authorization: `${auth.user.token}`
                        }
                    });
                    setSubjects(res.data.subjects);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [auth.user]);

    return (
        <>
            <SubjectList subjects={subjects} />
        </>
    );
}

export default Subject