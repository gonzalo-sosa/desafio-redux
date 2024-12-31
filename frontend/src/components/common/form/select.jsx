import PropTypes from 'prop-types';

const Select = ({ name, label, error, options, id, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={id} {...rest} className="form-control">
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option.name}></option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
