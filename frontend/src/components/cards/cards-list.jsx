import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardsByListId, updateCard } from '@/store/cards';
import NewCardForm from '@/components/cards/new-card-form';
import CardItem from './card-item';
import WithDroppable from '../hoc/with-droppable';
import WithDraggable from '../hoc/with-draggable';

class CardsList extends Component {
  state = {
    showForm: false,
  };

  render() {
    const { showForm } = this.state;
    const { listId, cards } = this.props;

    if (!cards) {
      return null;
    }

    return (
      <>
        <WithDroppable droppableId={`list-${listId}`}>
          <ul data-list-id={listId} className="list-group list-group-flush">
            {cards.map((card, index) => (
              <WithDraggable
                key={`draggable-for-card-${card.id}`}
                draggableId={`card-${card.id}`}
                className="p-1 px-0 list-group-item"
              >
                <CardItem key={`card-${card.id}`} card={card} index={index} />
              </WithDraggable>
            ))}
            {showForm ? (
              <NewCardForm
                onSubmit={() => this.setState({ showForm: false })}
                onClose={() => this.setState({ showForm: false })}
                listId={listId}
              />
            ) : (
              <button
                onClick={() => this.setState({ showForm: true })}
                className="btn btn-dark text-start mt-2"
              >
                + Añade una tarjeta
              </button>
            )}
          </ul>
        </WithDroppable>
      </>
    );
  }
}

CardsList.propTypes = {
  listId: PropTypes.number,
  cards: PropTypes.array,
  updateCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  cards: getCardsByListId(state, ownProps.listId),
});

const mapDispatchToProps = (dispatch) => ({
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
