import { Component } from 'react';

class Logo extends Component {
  state = {
    isMouseOver: true,
  };

  render() {
    const { isMouseOver } = this.state;
    const { ...rest } = this.props;
    if (isMouseOver) {
      return (
        <img
          src="logo-animation.gif"
          onMouseLeave={() => this.setState({ isMouseOver: false })}
          {...rest}
        />
      );
    }

    return (
      <img
        src="logo.gif"
        onMouseEnter={() => this.setState({ isMouseOver: true })}
        {...rest}
      />
    );
  }
}

export default Logo;
