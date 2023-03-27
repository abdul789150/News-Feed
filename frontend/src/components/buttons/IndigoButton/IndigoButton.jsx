const IndigoButton = ({ children, className, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={`bg-indigo-600 text-sm ${className} hover:bg-indigo-500`}
    >
      {children}
    </button>
  );
};

IndigoButton.defaultProps = {};
IndigoButton.propTypes = {};

export default IndigoButton;
