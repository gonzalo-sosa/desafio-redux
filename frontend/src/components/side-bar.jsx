import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SideBar = ({ items, children }) => {
  const renderItems = () => {
    return items.map((item, index) => {
      if (typeof item === 'function') {
        return item();
      } else {
        return (
          <li className="nav-item" key={`sidebar-item-${index}`}>
            <NavLink
              className={`nav-link text-light ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              key={`sidebar-link-${index}`}
              aria-current={item.active ? 'page' : undefined}
              to={item.href}
            >
              {item.label}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <aside className="aside d-flex flex-column p-3 bg-dark">
      <ul className="nav nav-pills flex-column mb-auto">{renderItems()}</ul>
      {children}
    </aside>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default SideBar;
