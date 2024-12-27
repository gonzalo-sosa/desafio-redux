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

  render() {
    const { showModal } = this.state;
    const { card, removeCard } = this.props;

    if (!card) {
      return null;
    }

    return (
      <li
        ref={this.props.innerRef}
        {...this.props.draggableProps}
        className="px-1 list-group-item d-flex flex-row align-items-center justify-content-between"
      >
        {card.title}
        <div
          {...this.props.dragHandleProps}
          className="d-flex flex-row align-items-center"
        >
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
          <button onClick={() => removeCard(card)} className="btn btn-danger">
            X
          </button>
        </div>
      </li>
    );
  }
}

CardItem.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  innerRef: PropTypes.func,
  draggableProps: PropTypes.object,
  dragHandleProps: PropTypes.object,
  removeCard: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeCard: (card) => dispatch(removeCard(card)),
});

export default connect(null, mapDispatchToProps)(CardItem);
