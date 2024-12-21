import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = ({ items, children }) => {
  const renderItems = () => {
    return items.map((item, index) => {
      if (typeof item === 'function') {
        return item();
      } else {
        return (
          <li className="nav-item" key={`sidebar-item-${index}`}>
            <Link
              className={`nav-link text-light ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              key={`sidebar-link-${index}`}
              aria-current={item.active ? 'page' : undefined}
              href={item.href}
            >
              {item.label}
            </Link>
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
