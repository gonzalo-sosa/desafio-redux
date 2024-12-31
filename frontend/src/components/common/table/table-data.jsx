import { Component } from 'react';
import PropTypes from 'prop-types';

class TableData extends Component {
  render() {
    return <td>{this.props.children}</td>;
  }
}

TableData.propTypes = {
  children: PropTypes.node,
};

export default TableData;
