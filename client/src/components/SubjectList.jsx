import PropTypes from 'prop-types';

const SubjectList = ({ subjects }) => {
    return (
        <div>
            <h2>Subjects</h2>
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>{subject.name}</li>
                ))}
            </ul>
        </div>
    );
};

SubjectList.propTypes = {
    subjects: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    )
};

export default SubjectList;