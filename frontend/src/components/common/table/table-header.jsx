import { Component } from 'react';
import TableRow from './table-row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={faSortAsc} />;

    return <FontAwesomeIcon icon={faSortDesc} />;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <TableRow>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column?.path || column?.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </TableRow>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
