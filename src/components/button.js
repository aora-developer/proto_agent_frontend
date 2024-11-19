import React from 'react';
import PropTypes from 'prop-types';

function Button({ variant, size, className = '', children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
    icon: "p-2"
  };

  const buttonClass = `
    ${baseStyles}
    ${variants[variant] || variants.default}
    ${sizes[size] || sizes.medium}
    ${className}
  `.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'ghost', 'destructive']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'icon']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'default',
  size: 'medium',
  className: '',
};

export default Button;