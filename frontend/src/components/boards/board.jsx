import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBoardById, removeBoard, updateBoard } from '@/store/boards';
import { getListsByBoardId } from '@/store/lists';
import BoardNavBar from './board-nav-bar';
import ListGroup from '../lists/list-group';

class Board extends Component {
  state = {
    draggedItem: null,
    lists: [],
  };

  handleDragStart = (e, id, index) => {
    const rect = e.target.getBoundingClientRect();

    this.setState({ draggedItem: { id, index, rect, clientX: e.clientX } });
  };

  handleDragOver = (e, id, index) => {
    e.preventDefault(); // Es necesario para permitir que el elemento sea soltado.

    if (this.state.draggedItem.id === id) return;

    // Filtrar para asegurarnos de que el cálculo solo se haga para el contenedor principal
    const targetElement = e.currentTarget; // 'currentTarget' siempre se refiere al elemento que escucha el evento
    if (!targetElement.contains(e.target)) {
      return; // Si el objetivo (e.target) está dentro de un hijo, no realizar el cálculo
    }
    const rect = targetElement.getBoundingClientRect(); // Obtén el rectángulo del objetivo

    const mousePosition = e.clientX; // Posición X del mouse en la pantalla

    const targetLeft = rect.left; // El borde izquierdo del objetivo
    const targetWidth = rect.width; // El ancho del objetivo
    const targetCenter = targetLeft + targetWidth / 2; // El centro del objetivo

    // Si el mouse está a la izquierda del centro del objetivo
    if (mousePosition < targetCenter) {
      if (
        !this.state.lists[index + 1] ||
        this.state.lists[index + 1].id !== this.state.draggedItem.id
      )
        return;
      // console.log('El elemento entra por la izquierda');
      // si el elemento sobre el que hace over tiene un espacio libre a la derecha entonces lo mueve
      // sino tiene espacio libre no lo mueve

      const listToMoveToIndex = this.state.lists.find(
        (list) => list.id === this.state.draggedItem.id,
      );
      const listToMoveToRight = this.state.lists.find((list) => list.id === id);

      const updatedLists = this.state.lists.filter(
        (list) => list.id !== id && list.id !== this.state.draggedItem.id,
      );

      updatedLists.splice(index, 0, listToMoveToIndex);
      updatedLists.splice(index + 1, 0, listToMoveToRight);

      this.setState({ lists: updatedLists });
    } else {
      if (
        !this.state.lists[index - 1] ||
        this.state.lists[index - 1].id !== this.state.draggedItem.id
      )
        return;
      // console.log('El elemento entra por la derecha');

      const listToMoveToIndex = this.state.lists.find(
        (list) => list.id === this.state.draggedItem.id,
      );
      const listToMoveToLeft = this.state.lists.find((list) => list.id === id);

      const updatedLists = this.state.lists.filter(
        (list) => list.id !== id && list.id !== this.state.draggedItem.id,
      );

      updatedLists.splice(index - 1, 0, listToMoveToLeft);
      updatedLists.splice(index, 0, listToMoveToIndex);

      this.setState({ lists: updatedLists });
    }
  };

  // handleDrop = (id, index) => {
  //   // actualizar lista del board
  // };

  componentDidMount() {
    this.setState({ lists: [...this.props.lists] });
  }

  componentDidUpdate(prevProps) {
    if (this.props.lists !== prevProps.lists) {
      this.setState({ lists: [...this.props.lists] });
    }
  }

  render() {
    const { board } = this.props;
    const { lists } = this.state;

    if (!board) {
      return <div>Board not found</div>;
    }

    if (!lists) {
      return <div>Loading...</div>;
    }

    return (
      <main className="board">
        <BoardNavBar boardId={board.id} title={board.title} />
        <div className="container-fluid mt-3">
          <div className="list-container">
            <ListGroup
              boardId={board.id}
              title="Listado de tareas"
              lists={lists}
              orders={this.state.orders}
              onDragStart={this.handleDragStart}
              onDragOver={this.handleDragOver}
              // onDrop={this.handleDrop}
            />
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
