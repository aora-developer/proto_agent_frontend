import React from 'react';
import PropTypes from 'prop-types';
import './App.css'; 

function Button({ variant, size, children, ...props }) {
  const className = `button ${variant} ${size}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'default',
  size: 'medium',
};

export default Button;