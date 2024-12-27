import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '@/components/cards/cards-list';
import NewListForm from '@/components/lists/new-list-form';
import { connect } from 'react-redux';
import { removeList } from '@/store/lists';
import { Droppable } from 'react-beautiful-dnd';

class List extends Component {
  state = {
    showNewForm: false,
  };

  render() {
    const { showNewForm } = this.state;
    const { lists } = this.props;

    if (!lists) {
      return null;
    }

    return (
      <>
        {lists.map((list) => (
          <section
            key={`list-${list.id}`}
            className="card"
            style={{ height: 'fit-content' }}
          >
            <header className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5
                  onClick={() => this.setState({ showEditForm: true })}
                  className="card-title"
                >
                  {list.title}
                </h5>
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
              <Droppable droppableId={`droppable-for-list-${list.id}`}>
                {(provided) => (
                  <CardsList
                    listId={list.id}
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {provided.placeholder}
                  </CardsList>
                )}
              </Droppable>
            </div>
          </section>
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
};

const mapDispatchToProps = (dispatch) => ({
  removeList: (list) => dispatch(removeList(list)),
});

export default connect(null, mapDispatchToProps)(List);
