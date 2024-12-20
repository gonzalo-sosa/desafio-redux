const Input = ({ name, label, error, children, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {children}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
