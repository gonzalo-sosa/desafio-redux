import PropTypes from 'prop-types';

const Input = ({ name, label, error, children, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input {...rest} id={name} name={name} className="form-control" />
      {children}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
};

export default Input;
