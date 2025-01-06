import { Component } from 'react';
import PropTypes from 'prop-types';

class DropArea extends Component {
  state = { showDrop: false };

  handleDragEnter = () => {
    this.setState({ showDrop: true });
  };

  handleDragLeave = () => {
    this.setState({ showDrop: false });
  };

  render() {
    const { children, className, onDragOver, onDrop, ...rest } = this.props;
    const { showDrop } = this.state;

    return (
      <div
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={onDragOver}
        onDrop={() => {
          if (onDrop) onDrop();
        }}
        className={`${showDrop ? className + ' active' : className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

DropArea.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

export default DropArea;
