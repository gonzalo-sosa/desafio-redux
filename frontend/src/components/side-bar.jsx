import PropTypes from 'prop-types';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoadIcon from './common/icons/load-icon';
import './side-bar.css';

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
          <li className="sidebar__nav__item" key={`sidebar-item-${index}`}>
            <NavLink
              className={`sidebar__nav__link ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
              key={`sidebar-link-${index}`}
              aria-current={item.active ? 'page' : undefined}
              exact
              to={item.href}
            >
              {item.icon && (
                <LoadIcon
                  name={item.icon}
                  height={18}
                  width={18}
                  className="me-2"
                />
              )}
              <span>{item.label}</span>
            </NavLink>
          </li>
        );
      }
    });
  };

  render() {
    const { children, isMenuOpen } = this.props;
    const className = isMenuOpen
      ? 'sidebar sidebar-toggle'
      : 'sidebar sidebar-toggle sidebar--collapsed';

    return (
      <aside className={className}>
        {children}
        <ul className="sidebar__nav">{this.renderItems()}</ul>
      </aside>
    );
  }
}

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default SideBar;
