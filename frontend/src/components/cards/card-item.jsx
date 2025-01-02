import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/common/modal';
import EditCardForm from './edit-card-form';
import PencilIcon from '@/components/common/icons/pencil-icon';
import { connect } from 'react-redux';
import { removeCard } from '@/store/cards';

class CardItem extends Component {
  state = {
    showModal: false,
  };

  handleEditCard = (e) => {
    e.stopPropagation();

    this.setState({ showModal: true });
  };

  handleRemoveCard = (e) => {
    e.stopPropagation();

    this.props.removeCard(this.props.card);
  };

  render() {
    const { showModal } = this.state;
    const { card, index } = this.props;

    if (!card) {
      return null;
    }

    return (
      <li
        data-card-index={index}
        className="list-group-item d-flex flex-row align-items-center justify-content-between"
      >
        {card.title}
        <div className="d-flex flex-row align-items-center">
          {showModal && (
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
                card={{ ...card, list_id: this.props.listId }}
                onSubmit={() => this.setState({ showModal: false })}
              />
            </Modal>
          )}
          <button
            type="button"
            onClick={this.handleEditCard}
            className="btn btn-primary mx-2"
          >
            <PencilIcon />
          </button>
          <button onClick={this.handleRemoveCard} className="btn btn-danger">
            X
          </button>
        </div>
      </li>
    );
  }
}

CardItem.propTypes = {
  listId: PropTypes.number,
  card: PropTypes.object,
  index: PropTypes.number,
  removeCard: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeCard: (card) => dispatch(removeCard(card)),
});

export default connect(null, mapDispatchToProps)(CardItem);
