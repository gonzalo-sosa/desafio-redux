import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardsByListId, updateCard } from '@/store/cards';
import NewCardForm from '@/components/cards/new-card-form';
import CardItem from './card-item';
import DndContext from '@/context/dnd-context';
/* eslint-disable no-unused-vars */

class CardsList extends Component {
  state = {
    showForm: false,
    cards: [],
  };

  static contextType = DndContext;

  handleDragStart = (e, item, container) => {
    e.stopPropagation();

    this.context.draggedItem.setDraggedItem(item);
    this.context.sourceContainer.setSourceContainer(container);
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragEnd = () => {
    //   this.context.draggedItem.setDraggedItem(null);
    //   this.context.sourceContainer.setSourceContainer(null);
  };

  handleDrop = (target, targetContainer) => {
    const { draggedItem, sourceContainer } = this.context;
    const { cards } = this.state;

    if (!draggedItem || !sourceContainer) return;

    if (!target || !targetContainer) return;

    if (draggedItem.id === target.id) return;

    if (sourceContainer.id !== targetContainer.id) return;

    if (draggedItem.index === target.index) return;

    const updatedCards = [...cards];

    const [itemToMove] = updatedCards.splice(draggedItem.index, 1);

    updatedCards.splice(target.index, 0, itemToMove);

    this.setState({
      cards: updatedCards,
    });
  };

  componentDidMount() {
    this.setState({ cards: this.props.cards });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      this.setState({ cards: this.props.cards });
    }
  }

  render() {
    const { showForm, cards } = this.state;
    const { listId } = this.props;

    if (!cards) {
      return null;
    }

    return (
      <DndContext.Consumer>
        {(dndContext) => (
          <ul
            className="list-group list-group-flush"
            onDragOver={this.handleDragOver}
          >
            {cards.map((card, index) => (
              <CardItem
                key={`card-${card.id}`}
                listId={listId}
                card={card}
                index={index}
                onDragStart={(e) =>
                  this.handleDragStart(
                    e,
                    { id: card.id, index },
                    { id: listId },
                  )
                }
                onDragOver={this.handleDragOver}
                onDrop={() =>
                  this.handleDrop({ id: card.id, index }, { id: listId })
                }
              />
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
                className="btn text-start d-flex flex-row align-items-center text-muted ps-0"
              >
                <span className="fs-4 me-2 mb-1 opacity-75">&#43;</span> Añade
                una tarjeta
              </button>
            )}
          </ul>
        )}
      </DndContext.Consumer>
    );
  }
}

CardsList.propTypes = {
  listId: PropTypes.number,
  cards: PropTypes.array,
  updateCard: PropTypes.func,
  onDrop: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  cards: getCardsByListId(state, ownProps.listId),
});

const mapDispatchToProps = (dispatch) => ({
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
