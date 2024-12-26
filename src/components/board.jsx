import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TasksList from './tasks-list';
import { getBoardById, removeBoard, updateBoard } from '@/store/boards';
import { getTasksByBoardId } from '@/store/tasks';
import BoardNavBar from './board-nav-bar';

class Board extends Component {
  render() {
    const { board, tasks } = this.props;

    if (!board) {
      return <div>Board not found</div>;
    }

    return (
      <main className="main">
        <BoardNavBar title={board.title} />
        <div className="container mt-3">
          <div className="tasks-list-container">
            <TasksList
              boardId={board.id}
              title="Listado de tareas"
              tasks={tasks}
            />
          </div>
        </div>
      </main>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object,
  tasks: PropTypes.array,
  updateBoard: PropTypes.func,
  removeBoard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const parsedId = parseInt(id, 10);

  return {
    board: getBoardById(state, parsedId),
    tasks: getTasksByBoardId(state, parsedId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateBoard: (data) => dispatch(updateBoard(data)),
  removeBoard: (id) => dispatch(removeBoard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
