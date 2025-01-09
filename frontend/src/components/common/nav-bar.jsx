import { Component } from 'react';
import PropTypes from 'prop-types';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    const { isMenuOpen } = this.state;
    const { className } = this.props;
    const [LeftCorner, Content, RightCorner] = this.props.children;

    return (
      <nav
        className={
          'navbar navbar-expand-lg px-2' + (className ? ` ${className}` : '')
        }
      >
        <div className="container-fluid">
          {LeftCorner}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleMenu}
            aria-controls="navbarNavDropdown"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
            id="navbarNavDropdown"
          >
            <div className="w-100 d-flex justify-content-start align-items-center">
              {Content}
            </div>
            <div className="w-100 d-flex justify-content-end align-items-center">
              {RightCorner}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  nav: PropTypes.object,
  children: PropTypes.array,
  className: PropTypes.string,
};

export default NavBar;
