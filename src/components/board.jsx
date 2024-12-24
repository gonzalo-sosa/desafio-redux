import { Component } from 'react';
import PropTypes from 'prop-types';

class Board extends Component {
  render() {
    return (
      <main className="main p-3">
        <h2>Board {this.props.board.id}</h2>
      </main>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
};

export default Board;
