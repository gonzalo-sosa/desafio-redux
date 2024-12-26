import { getBoards } from '../store/boards';
import NewBoardForm from './new-board-form';
import { NavLink } from 'react-router-dom';
import Modal from './common/modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Component } from 'react';

class BoardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  render() {
    const { boards } = this.props;

    return (
      <>
        <div className="nav-link text-light d-flex flex-row justify-content-between align-items-center pe-0">
          <span>Sus tableros</span>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ showForm: true })}
          >
            +
          </button>
        </div>
        <ul>
          {this.state.showForm && (
            <Modal
              label={'Nuevo tablero'}
              onClose={() => this.setState({ showForm: false })}
              btnSave={{
                type: 'submit',
                form: 'new-board-form',
              }}
            >
              <NewBoardForm
                onSubmit={() => this.setState({ showForm: false })}
                form={{ id: 'new-board-form' }}
              />
            </Modal>
          )}
          {boards.map((board) => (
            <li key={`board-${board.id}`} className="nav-item">
              <NavLink
                to={`/boards/${board.id}`}
                className="nav-link text-light"
              >
                {board.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

BoardsList.propTypes = {
  boards: PropTypes.array,
};

const mapStateToProps = (state) => ({
  boards: getBoards(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsList);
