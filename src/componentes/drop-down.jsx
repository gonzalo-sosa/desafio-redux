import PropTypes from 'prop-types';

const DropDown = ({ label, items }) => {
  return (
    <div className="dropdown show mx-2">
      <a
        className="btn dropdown-toggle text-light"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {items.map((item, index) => (
          <a className="dropdown-item" href={item.href} key={index}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default DropDown;
