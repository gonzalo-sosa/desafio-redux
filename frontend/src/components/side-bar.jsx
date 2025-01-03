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
              className={`nav-link text-dark ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              key={`sidebar-link-${index}`}
              aria-current={item.active ? 'page' : undefined}
              exact
              to={item.href}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  className="me-2"
                />
              )}
              {item.label}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <aside className="side-bar d-flex flex-column">
      {children}
      <ul className="nav nav-pills flex-column mb-auto pe-2">
        {renderItems()}
      </ul>
    </aside>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default SideBar;
