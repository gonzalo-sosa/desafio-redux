import { createPortal } from 'react-dom';

const Modal = ({ label, onClose, btnSave, children }) => {
  return createPortal(
    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{label}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose()}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose()}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              aria-label="Save changes"
              {...btnSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
