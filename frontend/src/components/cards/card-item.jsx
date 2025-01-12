import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/common/modal';
import EditCardForm from './edit-card-form';
import { connect } from 'react-redux';
import { removeCard } from '@/store/cards';
import PencilIcon from '@/components/common/icons/pencil-icon';
// import DndContext from '@/context/dnd-context';

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
    const { card } = this.props;

    if (!card) {
      return null;
    }

    return (
      <>
        <li
          draggable
          onDragStart={(e) => this.props.onDragStart(e)}
          onDragOver={this.props.onDragOver}
          onDrop={() => this.props.onDrop()}
          className="border py-1 px-2 my-1 bg-white shadow-sm rounded d-flex flex-row align-items-center justify-content-between"
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
              className="btn ms-2"
            >
              <PencilIcon height={20} width={20} />
            </button>
            <button onClick={this.handleRemoveCard} className="btn">
              <span className="fs-4 fw-bold">&times;</span>
            </button>
          </div>
        </li>
      </>
    );
  }
}

CardItem.propTypes = {
  listId: PropTypes.number,
  card: PropTypes.object,
  index: PropTypes.number,
  removeCard: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeCard: (card) => dispatch(removeCard(card)),
});

export default connect(null, mapDispatchToProps)(CardItem);
