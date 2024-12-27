import { Component } from 'react';
import PropTypes from 'prop-types';
import CardsList from '@/components/cards/cards-list';
import NewTasksListForm from '@/components/tasks/new-tasks-list-form';

class TasksList extends Component {
  state = {
    showForm: false,
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
            <NewTasksListForm
              onSubmit={() => this.setState({ showForm: false })}
              boardId={this.props.boardId}
            />
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
};

export default TasksList;
