import PropTypes from 'prop-types';
import React from 'react';

const IndigoStart = ({ text, className, ...divProps }) => {
  return (
    <div {...divProps} className={`w-max text-gray-800 ${className}`}>
      <h3>
        <span className="text-indigo-600">{text?.split(' ')[0]}</span>{' '}
        {text?.split(' ')[1]}
        <hr className="w-4/12 border border-indigo-600" />
      </h3>
    </div>
  );
};

export default IndigoStart;

IndigoStart.propTypes = {
  text: PropTypes.string,
};
