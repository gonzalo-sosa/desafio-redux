import { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '@/components/nav-bar';
import { connect } from 'react-redux';
import { getBoardById, removeBoard, updateBoard } from './../store/boards';
import { getTasksByBoardId } from '../store/tasks';

class Board extends Component {
  render() {
    return (
      <main className="main p-3">
        <NavBar />
        <section>
          <h2>{JSON.stringify(this.props.board)}</h2>
        </section>
      </main>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  board: getBoardById(state, ownProps.id),
});

const mapDispatchToProps = (dispatch) => ({
  updateBoard: (data) => dispatch(updateBoard(data)),
  removeBoard: (id) => dispatch(removeBoard(id)),
  getTasksByBoardId: (id) => dispatch(getTasksByBoardId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
