import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '@/components/cards/cards-list';
import NewListForm from '@/components/lists/new-list-form';
import { connect } from 'react-redux';
import { removeList } from '@/store/lists';
import { removeCard, updateCard } from '@/store/cards';

class List extends Component {
  state = {
    showNewForm: false,
  };

  // handleDragStart = (e) => {
  //   const { activatorEvent, active } = e;
  //   const { target } = activatorEvent;
  //   if (!(target instanceof HTMLElement) || target.tagName !== 'LI') return;

  //   if (target.closest('button')) {
  //     e.preventDefault();
  //   }

  //   const { cardIndex } = target.dataset;
  //   const { listId } = target.parentElement.parentElement.dataset;

  //   Object.assign(active.data, {
  //     current: target,
  //     cardIndex: Number(cardIndex),
  //     listId: Number(listId),
  //   });
  // };

  // handleDragEnd = ({ activatorEvent, active, over }) => {
  //   const { target } = activatorEvent;
  //   if (!(target instanceof HTMLElement) || target.tagName !== 'LI') return;

  //   const { cardIndex, listId: sourceListId } = active.data;
  //   const cardId = Number(active.id.split('-')[1]);
  //   const overListId = Number(over.id.split('-')[1]);

  //   if (sourceListId !== overListId) {
  //     this.props.updateCard({ id: cardId, listId: overListId });
  //   }

  //   // TODO: reordenar con cardIndex
  //   console.log({ cardIndex });
  // };

  render() {
    const { showNewForm } = this.state;
    const { lists } = this.props;

    if (!lists) {
      return null;
    }

    return (
      <>
        {lists.map((list) => (
          <article
            key={`list-${list.id}`}
            className="card"
            style={{ height: 'fit-content' }}
          >
            <header className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">{list.title}</h5>
                <button
                  onClick={() => this.props.removeList(list)}
                  type="button"
                  className="btn btn-danger"
                >
                  X
                </button>
              </div>
            </header>
            <div className="card-body">
              <CardsList listId={list.id} />
            </div>
          </article>
        ))}
        <div>
          {showNewForm ? (
            <NewListForm
              onSubmit={() => this.setState({ showNewForm: false })}
              boardId={this.props.boardId}
            />
          ) : (
            <button
              onClick={() => this.setState({ showNewForm: true })}
              type="button"
              className="btn btn-primary w-100 p-2 text-start"
            >
              + Agregar lista
            </button>
          )}
        </div>
      </>
    );
  }
}

List.propTypes = {
  boardId: PropTypes.number,
  title: PropTypes.string,
  lists: PropTypes.array,
  removeList: PropTypes.func,
  removeCard: PropTypes.func,
  updateCard: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeList: (list) => dispatch(removeList(list)),
  removeCard: (card) => dispatch(removeCard(card)),
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(null, mapDispatchToProps)(List);
