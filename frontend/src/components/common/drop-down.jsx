import PropTypes from 'prop-types';
import { Component } from 'react';

class DropDown extends Component {
  state = {
    showItems: false,
  };
  render() {
    const { label, items, className, ...rest } = this.props;
    const { showItems } = this.state;

    return (
      <div className={`dropdown show ` + className} {...rest}>
        <button
          className="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.showItems}
          onClick={() => this.setState({ showItems: !this.state.showItems })}
        >
          {label}
        </button>

        {showItems && (
          <div
            className="dropdown-menu d-block"
            aria-labelledby="dropdownMenuButton"
          >
            {items.map((item, index) => (
              <a className="dropdown-item" href={item.href} key={index}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
}

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default DropDown;
