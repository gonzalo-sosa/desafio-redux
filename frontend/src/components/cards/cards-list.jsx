import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardsByListId, updateCard } from '@/store/cards';
import NewCardForm from '@/components/cards/new-card-form';
import CardItem from './card-item';

class CardsList extends Component {
  state = {
    showForm: false,
    cards: [],
    draggedItem: null,
    sourceContainer: null,
  };

  handleDragStart = (e, item, container) => {
    this.setState({ draggedItem: item, sourceContainer: container });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e, target, targetContainer) => {
    const { draggedItem, sourceContainer, cards } = this.state;

    if (!draggedItem || !sourceContainer) return;

    if (!target || !targetContainer) return;

    if (draggedItem.id === target.id) return;

    //Reorganizar dentro del mismo contenedor
    if (sourceContainer.id === targetContainer.id) {
      if (draggedItem.index === target.index) return;

      const updatedCards = [...cards];

      // Mover el elemento a su nueva posición dentro del mismo contenedor
      const itemToMove = updatedCards.splice(draggedItem.index, 1)[0];

      updatedCards.splice(target.index, 0, itemToMove);

      this.setState({
        cards: updatedCards,
      });
    } // Mover entre contenedores
    else {
      //   const updatedGroupListItems = [...groupListItems];
      //   const sourceList = updatedGroupListItems[sourceContainer.index];
      //   const targetList = updatedGroupListItems[container.index];
      //   const itemToMove = sourceList.splice(draggedItem.index, 1)[0];
      //   targetList.splice(item.index, 0, itemToMove);
      //   this.setState({
      //     groupListItems: updatedGroupListItems,
      //   });
    }

    // Limpiar el estado
    this.setState({ draggedItem: null, sourceContainer: null });
  };

  componentDidMount() {
    this.setState({ cards: this.props.cards });
  }

  render() {
    const { showForm, cards } = this.state;
    const { listId } = this.props;

    if (!cards) {
      return null;
    }

    return (
      <>
        <ul data-list-id={listId} className="list-group list-group-flush">
          {cards.map((card, index) => (
            <CardItem
              key={`card-${card.id}`}
              listId={listId}
              card={card}
              index={index}
              onDragStart={(e) =>
                this.handleDragStart(e, { id: card.id, index }, { id: listId })
              }
              onDragOver={this.handleDragOver}
              onDrop={(e) =>
                this.handleDrop(e, { id: card.id, index }, { id: listId })
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
              <span className="fs-4 me-2 mb-1 opacity-75">&#43;</span> Añade una
              tarjeta
            </button>
          )}
        </ul>
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
