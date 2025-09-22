import React from "react";
import "./ErrorModal.css";

function ErrorModal({ message, onClose }) {
  return (
    <div className="modal1-overlay">
      <div className="modal1">
        <header className="modal1-header">
          <h2>Error</h2>
        </header>
        <div className="modal1-body">
          <p>{message}</p>
        </div>
        <footer className="modal1-footer">
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ErrorModal;
