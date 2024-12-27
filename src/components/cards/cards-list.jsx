import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardsByListId } from '@/store/cards';
import NewCardForm from '@/components/cards/new-card-form';
import CardItem from './card-item';
import { Draggable } from 'react-beautiful-dnd';

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
      <ul ref={this.props.innerRef} className="list-group list-group-flush">
        {cards.map((card, index) => (
          <Draggable
            key={`draggable-for-card-${card.id}`}
            draggableId={`draggable-for-card-${card.id}`}
            index={index}
          >
            {(provided) => (
              <CardItem
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                innerRef={provided.innerRef}
                key={`card-${card.id}`}
                card={card}
                index={index}
              />
            )}
          </Draggable>
        ))}
        {this.props.children}
        {showForm ? (
          <NewCardForm
            onSubmit={() => this.setState({ showForm: false })}
            onClose={() => this.setState({ showForm: false })}
            listId={listId}
          />
        ) : (
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
  listId: PropTypes.number,
  innerRef: PropTypes.func,
  cards: PropTypes.array,
  children: PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  cards: getCardsByListId(state, ownProps.listId),
});

export default connect(mapStateToProps, null)(CardsList);
