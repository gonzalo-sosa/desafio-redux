import { Component } from 'react';
import iconNames from '../common/icons/icon-names';
import LoadIcon from '../common/icons/load-icon';
import Modal from '../common/modal';
import UserForm from './user-form';
import { NavLink } from 'react-router-dom';

class UserItem extends Component {
  state = { showModal: false };
  render() {
    return (
      <NavLink
        to="/users"
        className="sidebar__nav__link d-inline-flex py-0 pe-0 w-100 justify-content-between"
      >
        <span className="d-flex align-items-center">
          <LoadIcon
            name={iconNames.USER}
            height={18}
            width={18}
            className="me-3"
          />
          Usuarios
        </span>
        <button
          className="btn me-1"
          onClick={() => this.setState({ showModal: true })}
        >
          <LoadIcon name={iconNames.CROSS} height={16} width={16} />
        </button>
        {this.state.showModal && (
          <Modal
            label={'Nuevo usuario'}
            onClose={() => this.setState({ showModal: false })}
            btnSave={{
              type: 'submit',
              form: 'new-user-form',
            }}
          >
            <UserForm
              action="add"
              form={{ id: 'new-user-form' }}
              onSubmit={() => this.setState({ showModal: false })}
            />
          </Modal>
        )}
      </NavLink>
    );
  }
}

export default UserItem;
