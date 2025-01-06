import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '../cards/cards-list';

class ListItem extends Component {
  state = {
    isClosed: false,
    isDragging: false,
  };

  handleDragStart = (e, id, index) => {
    this.setState({ isDragging: true });
    this.props.onDragStart(e, id, index);

    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.style.backgroundColor = '#ccc';
  };

  handleDragEnd = (e) => {
    this.setState({ isDragging: false });
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.backgroundColor = 'inherit';
  };

  render() {
    const { isClosed, isDragging } = this.state;
    const { list, index } = this.props;

    return (
      <article
        draggable
        onDragStart={(e) => this.handleDragStart(e, list.id, index)}
        onDragEnd={this.handleDragEnd}
        key={`list-${list.id}`}
        className={`card list-card${isClosed ? '--closed' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{ height: 'fit-content' }}
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
                style={{ display: `${this.state.isClosed ? 'none' : 'block'}` }}
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
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default ListItem;
