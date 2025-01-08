import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '../cards/cards-list';
import DndContext from '@/context/dnd-context';
/* eslint-disable no-unused-vars */

class ListItem extends Component {
  state = {
    isClosed: false,
  };

  static contextType = DndContext;

  handleDragStart = (e, id, index) => {
    this.props.onDragStart(e, id, index);
  };

  handleDrop = (listId) => {
    if (!this.context.draggedItem || !this.context.sourceContainer) return;

    const card = this.props.getCardById(Number(this.context.draggedItem.id));
    this.props.onDrop({ ...card, list_id: listId });
  };

  render() {
    const { isClosed, isDragging } = this.state;
    const { list, index } = this.props;

    return (
      <DndContext.Consumer>
        {(dndContext) => (
          <article
            draggable
            onDragStart={(e) => this.handleDragStart(e, list.id, index)}
            onDragOver={(e) => this.props.onDragOver(e, list.id, index)}
            onDragEnd={this.props.onDragEnd}
            onDrop={() => this.handleDrop(list.id)}
            key={`list-${list.id}`}
            className={`card list-card${isClosed ? '--closed' : ''} ${isDragging ? 'dragging' : ''}`}
          >
            <header className="card-header py-1 border-0 bg-transparent">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="card-title mb-0 ms-2">{list.title}</h6>
                <div className="d-flex flex-row align-items-center">
                  <button
                    className="btn"
                    onClick={() => this.setState({ isClosed: !isClosed })}
                  >
                    {this.state.isClosed ? (
                      <img
                        src="/icons/left-right-arrows.svg"
                        alt="Abrir"
                        width={16}
                      />
                    ) : (
                      <img
                        src="/icons/arrows.svg"
                        alt="Cerrar"
                        width={16}
                        style={{ transform: 'rotate(45deg)' }}
                      />
                    )}
                  </button>
                  <button
                    className="btn"
                    style={{
                      display: `${this.state.isClosed ? 'none' : 'block'}`,
                    }}
                  >
                    <img src="/icons/dots.svg" alt="Opciones" width={20} />
                  </button>
                </div>
                {/* <button
                        onClick={() => this.props.removeList(list)}
                        type="button"
                        className="btn btn-danger"
                      >
                        X
                      </button> */}
              </div>
            </header>
            <div
              className="card-body py-1"
              style={{ display: `${this.state.isClosed ? 'none' : 'block'}` }}
            >
              <CardsList listId={list.id} />
            </div>
          </article>
        )}
      </DndContext.Consumer>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getCardById: PropTypes.func.isRequired,
};

export default ListItem;
