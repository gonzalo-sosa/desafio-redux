import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardsByListId, updateCard } from '@/store/cards';
import NewCardForm from '@/components/cards/new-card-form';
import CardItem from './card-item';

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
        <ul data-list-id={listId} className="list-group list-group-flush">
          {cards.map((card, index) => (
            <CardItem
              key={`card-${card.id}`}
              listId={listId}
              card={card}
              index={index}
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
              className="btn text-start d-flex flex-row align-items-center"
            >
              <span className="fs-4 me-2 mb-1">&#43;</span> Añade una tarjeta
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
