import PropTypes from 'prop-types';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SideBar extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    children: PropTypes.node,
    onMenuToggle: PropTypes.func,
    isMenuOpen: PropTypes.bool,
  };

  handleMenuToggle = () => {
    this.props.onMenuToggle(this.props.isMenuOpen);
  };

  renderItems = () => {
    const { items } = this.props;
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

  render() {
    const { children, isMenuOpen } = this.props;
    const className = isMenuOpen ? 'side-bar--show' : 'side-bar';

    return (
      <aside className={className}>
        {children}
        <ul className="nav nav-pills flex-column mb-auto pe-2">
          {this.renderItems()}
        </ul>
      </aside>
    );
  }
}

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default SideBar;
