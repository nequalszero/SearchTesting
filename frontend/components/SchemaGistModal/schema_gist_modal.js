import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyle = {
  content: {
    borderRadius          : '0px',
    bottom                : 'auto',
    boxShadow             : '0px 10px 25px rgba(0, 0, 0, 0.5)',
    font                  : '16px sans-serif',
    left                  : '50%',
    marginRight           : '-50%',
    maxHeight             : '95%',
    padding               : '0px 0px',
    right                 : 'auto',
    top                   : '50%',
    transform             : 'translate(-50%, -50%)',
  }
};

const SchemaGistModal = (props) => {
  return (
    <Modal isOpen={ props.modalIsOpen }
      onRequestClose={ () => props.onRequestClose() }
      onAfterOpen={ () => $('[data-gist-id]').gist() }
      contentLabel="Modal"
      style={customStyle}>
      <div className="schema-gist-container">
        <code data-gist-id={props.gistId}
          data-gist-show-spinner="true"
          data-gist-enable-cache="true">
        </code>
      </div>
    </Modal>
  );
}

SchemaGistModal.propTypes = {
  gistId: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SchemaGistModal;
