import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '@/store/users';
import { NavLink } from 'react-router-dom';
import Modal from '@/components/common/modal';
import NewUserForm from './new-user-form';

class UsersList extends Component {
  state = {
    showForm: false,
  };

  render() {
    const { showForm } = this.state;

    return (
      <>
        <div className="nav-link text-light d-flex flex-row justify-content-between align-items-center pe-0">
          <span>Usuarios</span>
          <button
            onClick={() => this.setState({ showForm: true })}
            className="btn btn-primary"
          >
            +
          </button>
        </div>
        {showForm && (
          <Modal
            label={'Nuevo usuario'}
            onClose={() => this.setState({ showForm: false })}
            btnSave={{
              type: 'submit',
              form: 'new-user-form',
            }}
          >
            <NewUserForm
              onSubmit={() => this.setState({ showForm: false })}
              form={{ id: 'new-user-form' }}
            />
          </Modal>
        )}
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id} className="nav-item">
              <NavLink to={`/users/${user.id}`} className="nav-link text-light">
                {user.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

export default connect(mapStateToProps, null)(UsersList);
