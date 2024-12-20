const SideBar = ({ items, children }) => {
  const renderItems = () => {
    return items.map((item, index) => {
      if (typeof item === 'function') {
        return item();
      } else {
        return (
          <li className="nav-item" key={`sidebar-item-${index}`}>
            <a
              className={`nav-link text-light ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              key={`sidebar-link-${index}`}
              aria-current={item.active ? 'page' : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        );
      }
    });
  };

  return (
    <aside
      className="d-flex flex-column p-3 bg-dark"
      style={{ width: '250px', height: '100vh' }}
    >
      <ul className="nav nav-pills flex-column mb-auto">{renderItems()}</ul>
      {children}
    </aside>
  );
};

export default SideBar;
