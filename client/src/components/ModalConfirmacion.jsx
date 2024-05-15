import PropTypes from 'prop-types'

const ModalConfirmacion = ({ eliminar, handleConfirmDelete, handleCancelDelete }) => {
    return (
        <div className="overlay" onClick={handleCancelDelete}>
            <div className="modal">
                <div className="modal-content">
                    <p>¿Desea eliminar este {eliminar}?</p>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button className='cancel-button' onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalConfirmacion.propTypes = {
    eliminar: PropTypes.string.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
    handleCancelDelete: PropTypes.func.isRequired,
}
export default ModalConfirmacion