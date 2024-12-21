import PropTypes from 'prop-types';
import { Component } from 'react';

class DropDown extends Component {
  state = {
    showItems: false,
  };
  render() {
    const { label, items } = this.props;
    const { showItems } = this.state;

    return (
      <div className="dropdown show mx-2">
        <button
          className="btn dropdown-toggle text-light"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.showItems}
          onClick={() => this.setState({ showItems: !this.state.showItems })}
        >
          {label}
        </button>

        {showItems && (
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
};

export default DropDown;
