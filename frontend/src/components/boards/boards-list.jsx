import { getBoards } from '@/store/boards';
import NewBoardForm from '@/components/boards/new-board-form';
import { NavLink } from 'react-router-dom';
import Modal from '@/components/common/modal';
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

    if (!boards) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h6 className="my-0 text-light">Sus tableros</h6>
          <button
            className="btn d-flex flex-row justify-content-center align-items-center"
            onClick={() => this.setState({ showForm: true })}
          >
            <span className="fs-4 text-light">&#43;</span>
          </button>
        </div>
        <ul className="px-0">
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
            <li key={`board-${board.id}`} className="sidebar__nav__item">
              <NavLink
                to={`/boards/${board.id}`}
                className="sidebar__nav__link"
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

export default connect(mapStateToProps, null)(BoardsList);
