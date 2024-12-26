import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addCard,
  removeCard,
  updateCard,
  getCardsByTaskId,
} from '@/store/cards';
import PencilIcon from './common/icons/pencil-icon';
import Modal from '@/components/common/modal';
import EditCardForm from './edit-card-form';

class CardsList extends Component {
  state = {
    showForm: false,
    showModal: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const [input] = e.target;

    this.props.addCard({ title: input.value, taskId: this.props.taskId });
    this.setState({ showForm: false });
  };

  render() {
    const { showForm } = this.state;
    const { cards } = this.props;

    return (
      <ul className="list-group list-group-flush">
        {cards.map((card) => (
          <li
            key={`card-${card.id}`}
            className="px-1 list-group-item d-flex flex-row align-items-center justify-content-between"
          >
            {card.title}
            <div className="d-flex flex-row align-items-center">
              {this.state.showModal && (
                <Modal
                  label={'Editar tarjeta'}
                  onClose={() => this.setState({ showModal: false })}
                  btnSave={{
                    type: 'submit',
                    form: 'edit-card-form',
                  }}
                >
                  <EditCardForm
                    form={{ id: 'edit-card-form' }}
                    onSubmit={() => this.setState({ showModal: false })}
                  />
                </Modal>
              )}
              <button
                onClick={() => this.setState({ showModal: true })}
                className="btn btn-primary mx-2"
              >
                <PencilIcon />
              </button>
              <button
                onClick={() => this.props.removeCard(card)}
                className="btn btn-danger"
              >
                X
              </button>
            </div>
          </li>
        ))}
        {showForm && (
          <form onSubmit={this.handleSubmit} className="py-2">
            <input
              type="text"
              placeholder="Introduce el título"
              className="form-control"
            />
            <div className="d-flex flex-row align-items-center justify-content-start mt-2">
              <button type="submit" className="btn btn-primary">
                Añadir tarjeta
              </button>
              <button
                onClick={() => this.setState({ showForm: false })}
                type="button"
                className="btn btn-danger mx-2"
              >
                X
              </button>
            </div>
          </form>
        )}
        {!showForm && (
          <button
            onClick={() => this.setState({ showForm: true })}
            className="btn btn-dark text-start"
          >
            + Añade una tarjeta
          </button>
        )}
      </ul>
    );
  }
}

CardsList.propTypes = {
  taskId: PropTypes.number,
  cards: PropTypes.array,
  addCard: PropTypes.func,
  removeCard: PropTypes.func,
  updateCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  cards: getCardsByTaskId(state, ownProps.taskId),
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCard(card)),
  removeCard: (card) => dispatch(removeCard(card)),
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
