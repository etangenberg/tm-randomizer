import React from 'react';
import PropTypes from 'prop-types';

import './modal.css';

const renderModal = (children, className) => (
  <div className="dimmer">
    <div className={["modal", className].filter(Boolean).join(' ')}>
      {children}
    </div>
  </div>
);

const Modal = ({ open, children, className }) => (open ? renderModal(children, className) : null);

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

Modal.defaultProps = {
  open: false,
  children: undefined,
  className: undefined,
};

export default Modal;