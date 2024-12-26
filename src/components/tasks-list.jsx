import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from './cards-list';
import { connect } from 'react-redux';
import { addTask } from '@/store/tasks';

class TasksList extends Component {
  state = {
    showForm: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    const [input] = e.target;

    this.props.addTask({ title: input.value, boardId: this.props.boardId });
    this.setState({ showForm: false });
  };

  render() {
    const { showForm } = this.state;
    const { tasks } = this.props;

    if (!tasks) {
      return null;
    }

    return (
      <>
        {tasks.map((task) => (
          <section
            key={`task-${task.id}`}
            className="card"
            style={{ height: 'fit-content' }}
          >
            <header className="card-header">
              <h5 className="card-title">{task.title}</h5>
            </header>
            <div className="card-body">
              <CardsList taskId={task.id} />
            </div>
          </section>
        ))}
        <div>
          {showForm && (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Introduce el nombre de la lista..."
              />
            </form>
          )}
          {!showForm && (
            <button
              onClick={() => this.setState({ showForm: true })}
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

TasksList.propTypes = {
  boardId: PropTypes.number,
  title: PropTypes.string,
  tasks: PropTypes.array,
  addTask: PropTypes.func,
};

// const mapStateToProps = (state) => ({
//   getCardsByTaskId: (taskId) => getCardsByTaskId(state, taskId),
// });

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});

export default connect(null, mapDispatchToProps)(TasksList);
