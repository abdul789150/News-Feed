import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  icon,
  type,
  name,
  required,
  className,
  updateData,
  placeholder,
  defaultValue,
  ...divProps 
}) => {
  return (
    <div
      {...divProps}
      className={`${className}`}
    >
      <div className="relative">
        <input
          type={type}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => updateData(e.target.name, e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;

Input.defaultProps = {
  required: false
};

Input.propTypes = {
  icon: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  updateData: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
};
