import { Component } from 'react';
import TableRow from './table-row';
import TableData from './table-data';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey(item, column) {
    return item._id + (column.path || column.key);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => {
              return (
                <TableData key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </TableData>
              );
            })}
          </TableRow>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableBody;
