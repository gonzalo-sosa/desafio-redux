import { Component } from 'react';
import PropTypes from 'prop-types';
import NewListForm from '@/components/lists/new-list-form';
import { connect } from 'react-redux';
import { removeList } from '@/store/lists';
import { removeCard, updateCard, getCardById } from '@/store/cards';
import ListItem from './list-item';

class ListGroup extends Component {
  state = {
    showNewForm: false,
  };

  render() {
    const { showNewForm } = this.state;
    const { lists, onDragStart, onDragOver, onDragEnd, onDrop } = this.props;

    if (!lists) {
      return null;
    }

    return (
      <>
        {lists.map((list, index) => (
          <ListItem
            list={list}
            key={list.id}
            index={index}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            getCardById={this.props.getCardById}
          />
        ))}
        <div className="new-list-container" style={{ order: lists.length + 1 }}>
          {showNewForm ? (
            <NewListForm
              onSubmit={() => this.setState({ showNewForm: false })}
              boardId={this.props.boardId}
              onClose={() => this.setState({ showNewForm: false })}
            />
          ) : (
            <button
              onClick={() => this.setState({ showNewForm: true })}
              type="button"
              className="btn w-100 p-2 text-start d-flex flex-row align-items-center new-list"
            >
              <span className="fs-4 me-2 mb-1"> &#43;</span>Añade otra lista
            </button>
          )}
        </div>
      </>
    );
  }
}

ListGroup.propTypes = {
  boardId: PropTypes.number,
  title: PropTypes.string,
  lists: PropTypes.array,
  orders: PropTypes.object,
  removeList: PropTypes.func,
  removeCard: PropTypes.func,
  updateCard: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
  getCardById: PropTypes.func,
};

const mapStateToProps = (state) => ({
  getCardById: (id) => getCardById(state, id),
});

const mapDispatchToProps = (dispatch) => ({
  removeList: (list) => dispatch(removeList(list)),
  removeCard: (card) => dispatch(removeCard(card)),
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListGroup);
