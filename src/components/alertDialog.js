import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css'; // 更新为相对于src目录的正确路径

function AlertDialog({ children }) {
  return <div className="alert-dialog">{children}</div>;
}

export function AlertDialogTrigger({ asChild, children }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return React.cloneElement(children, { onClick: handleClick });
}

export function AlertDialogContent({ children }) {
  return <div className="alert-dialog-content">{children}</div>;
}

export function AlertDialogHeader({ children }) {
  return <div className="alert-dialog-header">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="alert-dialog-title">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="alert-dialog-description">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="alert-dialog-footer">{children}</div>;
}

export function AlertDialogCancel({ children, onClick }) {
  return (
    <button className="alert-dialog-cancel" onClick={onClick}>
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  return (
    <button className="alert-dialog-action" onClick={onClick}>
      {children}
    </button>
  );
}

AlertDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogTrigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

AlertDialogContent.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogDescription.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogCancel.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

AlertDialogAction.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AlertDialog;