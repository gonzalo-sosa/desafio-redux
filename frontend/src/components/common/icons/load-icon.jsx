import { Component } from 'react';
import PropTypes from 'prop-types';
import { ICONS } from './icon-names';

class LoadIcon extends Component {
  render() {
    const { name, ...rest } = this.props;

    return (
      <svg className="icon" {...rest}>
        <use xlinkHref={`icons/sprite.svg#${ICONS[name]}`}></use>
      </svg>
    );
  }
}

LoadIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
};

export default LoadIcon;
