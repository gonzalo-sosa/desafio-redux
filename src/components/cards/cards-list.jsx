import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeCard, getCardsByTaskId } from '@/store/cards';
import PencilIcon from '@/components/common/icons/pencil-icon';
import Modal from '@/components/common/modal';
import EditCardForm from '@/components/cards/edit-card-form';
import NewCardForm from '@/components/cards/new-card-form';

class CardsList extends Component {
  state = {
    showForm: false,
    showModal: false,
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
                    card={card}
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
          <NewCardForm
            onSubmit={() => this.setState({ showForm: false })}
            onClose={() => this.setState({ showForm: false })}
            taskId={this.props.taskId}
          />
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
  removeCard: PropTypes.func,
  updateCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  cards: getCardsByTaskId(state, ownProps.taskId),
});

const mapDispatchToProps = (dispatch) => ({
  removeCard: (card) => dispatch(removeCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
