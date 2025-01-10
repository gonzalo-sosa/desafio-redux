import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '@/store/users';
import { NavLink } from 'react-router-dom';
import UserContext from '@/context/user-context';

class UsersList extends Component {
  static contextType = UserContext;

  filterUsers() {
    return this.props.users.filter((user) => user.email !== this.context.email);
  }

  render() {
    return (
      <UserContext.Consumer>
        {() => (
          <div className="container-fluid mt-3">
            <ul className="list-group">
              {this.filterUsers().map((user) => (
                <li key={user.id} className="list-group-item">
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </UserContext.Consumer>
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
