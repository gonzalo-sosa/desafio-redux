import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById } from '@/store/users';
import PencilIcon from '@/components/common/icons/pencil-icon';
import { removeUser, updateUser } from '@/store/users';
import TabPane from '@/components/common/tab-pane';
import Modal from '@/components/common/modal';
import UserForm from './user-form';

class User extends Component {
  state = {
    showEditForm: false,
  };

  tabs = [{ id: 'tab-1', label: 'Actividad', active: true }];

  columns = [
    {
      path: 'icon',
      label: '',
      content: (item) => (
        <div className="text-center">
          <i className={`fa ${item.icon}`}></i>
        </div>
      ),
    },
    {
      path: 'description',
      label: '',
      content: (item) => (
        <div>
          {item.description} <a href={item.link}>{item.project}</a> project.
        </div>
      ),
    },
  ];

  render() {
    const { showEditForm } = this.state;
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const { name, email, address, phone } = user;

    return (
      <main className="main py-3 ps-1" id="user-profile">
        <div className="container-fluid">
          <div className="card p-4">
            <div className="d-flex justify-content-between">
              <h2 className="card-title">Información de usuario</h2>
              <div>
                <button
                  onClick={() => this.setState({ showEditForm: true })}
                  className="btn btn-primary edit-profile"
                >
                  <PencilIcon />
                  Editar perfil
                </button>
                <button
                  onClick={() => this.props.removeUser(user)}
                  type="button"
                  className="btn btn-danger ms-4"
                >
                  X
                </button>
              </div>
            </div>
            {showEditForm && (
              <Modal
                label={'Editar perfil'}
                onClose={() => this.setState({ showEditForm: false })}
                btnSave={{
                  type: 'submit',
                  form: 'edit-user-form',
                }}
              >
                <UserForm
                  action="update"
                  user={user}
                  form={{ id: 'edit-user-form' }}
                  onSubmit={() => this.setState({ showEditForm: false })}
                />
              </Modal>
            )}
            <div className="row card-body">
              <div className="col-sm-8">
                {name && (
                  <div className="d-flex flex-row align-items-center justify-content-start">
                    <span className="">Nombre:</span>
                    <span className="ms-4">{name}</span>
                  </div>
                )}

                {address && (
                  <div className="d-flex flex-row align-items-center justify-content-start">
                    <span className="">Address:</span>
                    <span className="ms-4">{address}</span>
                  </div>
                )}

                {email && (
                  <div className="d-flex flex-row align-items-center justify-content-start">
                    <span className="">Email:</span>
                    <span className="ms-4">{email}</span>
                  </div>
                )}

                {phone && (
                  <div className="d-flex flex-row align-items-center justify-content-start">
                    <span className="">Phone number:</span>
                    <span className="ms-4">{phone}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <ul className="nav nav-tabs">
                {this.tabs.map((tab) => (
                  <li
                    key={tab.id}
                    className={`nav-item ${tab.active ? 'active' : ''}`}
                  >
                    <a
                      href={`#${tab.id}`}
                      data-toggle="tab"
                      className="nav-link"
                    >
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                <TabPane id="tab-activity" active />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func,
  removeUser: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const parsedId = parseInt(id, 10);

  return {
    user: getUserById(state, parsedId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user)),
  removeUser: (user) => dispatch(removeUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
