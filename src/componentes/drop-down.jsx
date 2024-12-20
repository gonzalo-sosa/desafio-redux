const DropDown = ({ label, items }) => {
  return (
    <div className="dropdown show mx-2 text-white">
      <a
        className="btn dropdown-toggle"
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

export default DropDown;
