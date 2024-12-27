import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../lists/list';
import { getBoardById, removeBoard, updateBoard } from '@/store/boards';
import { getListsByBoardId } from '@/store/lists';
import BoardNavBar from './board-nav-bar';

class Board extends Component {
  render() {
    const { board, lists } = this.props;

    if (!board) {
      return <div>Board not found</div>;
    }

    return (
      <main className="main">
        <BoardNavBar title={board.title} />
        <div className="container mt-3">
          <div className="list-container">
            <List boardId={board.id} title="Listado de tareas" lists={lists} />
          </div>
        </div>
      </main>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object,
  lists: PropTypes.array,
  updateBoard: PropTypes.func,
  removeBoard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const parsedId = parseInt(id, 10);

  return {
    board: getBoardById(state, parsedId),
    lists: getListsByBoardId(state, parsedId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateBoard: (data) => dispatch(updateBoard(data)),
  removeBoard: (id) => dispatch(removeBoard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
