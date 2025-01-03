import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '../cards/cards-list';

class ListItem extends Component {
  state = {
    isClosed: false,
  };

  render() {
    const { list } = this.props;

    return (
      <article
        key={`list-${list.id}`}
        className={`card list-card${this.state.isClosed ? '--closed' : ''}`}
        style={{ height: 'fit-content' }}
      >
        <header className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="card-title">{list.title}</h6>
            <div className="d-flex flex-row align-items-center">
              <button
                className="btn"
                onClick={() =>
                  this.setState({ isClosed: !this.state.isClosed })
                }
              >
                {this.state.isClosed ? (
                  <img
                    src="/icons/left-right-arrows.svg"
                    alt="Abrir"
                    width={20}
                  />
                ) : (
                  <img
                    src="/icons/arrows.svg"
                    alt="Cerrar"
                    width={20}
                    style={{ transform: 'rotate(45deg)' }}
                  />
                )}
              </button>
              <button
                className="btn"
                style={{ display: `${this.state.isClosed ? 'none' : 'block'}` }}
              >
                <img src="/icons/dots.svg" alt="Opciones" className="w-100" />
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
};

export default ListItem;
