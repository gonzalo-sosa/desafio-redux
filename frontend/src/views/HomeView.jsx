import { Component } from 'react';
import { loadBoardsByUserEmail } from '@/store/boards';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/boards/board';
import BoardsList from '@/components/boards/boards-list';
import configureStore from '@/store/configureStore';
import iconNames from '@/components/common/icons/icon-names';
import LoadIcon from '@/components/common/icons/load-icon';
import NavBar from '@/components/nav-bar';
import PropTypes from 'prop-types';
import SideBar from '@/components/side-bar';
import UserInfo from '@/components/users/user-info';
import UserItem from '@/components/users/user-item';
import UsersList from '@/components/users/users-list';
import auth from '@/services/authService';
import getInitials from '../utils/getInitials';
import UserContext from '@/context/user-context';

const store = configureStore();

const sideBarItems = [
  { label: 'Tableros', href: '/boards', icon: iconNames.BOARDS },
  () => (
    <li key={'users'} className="sidebar__nav__item">
      <UserItem />
    </li>
  ),
  {
    label: 'Ajustes del Espacio de trabajo',
    href: '/settings',
    icon: iconNames.SETTINGS,
  },
  () => (
    <li
      key={'workspaces'}
      className="sidebar__nav__item my-2 ps-3  d-flex align-items-center justify-content-between"
    >
      <span className="font-weight-bold">Vistas del Espacio de trabajo</span>
      <button className="btn me-1">
        <LoadIcon name={iconNames.CROSS} height={16} width={16} />
      </button>
    </li>
  ),
  { label: 'Tabla', href: '/table', icon: iconNames.TABLE },
  { label: 'Calendario', href: '/calendar', icon: iconNames.CALENDAR },
  () => (
    <li key={'boards-list'} className="sidebar__nav__item mt-2 ps-3 pe-1">
      <BoardsList />
    </li>
  ),
];

class HomeView extends Component {
  state = {
    user: null,
    showSidebar: true,
  };

  setUser = (user) => {
    this.setState({ user });
  };

  handleShowSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  componentDidMount() {
    const { error, data } = auth.getCurrentUser();
    if (error) {
      return window.location.replace('/login');
    }

    const { user } = data;
    const initials = getInitials(user.name);
    this.setState({ user: { ...user, initials } });

    // store.dispatch(loadUsers());
    store.dispatch(loadBoardsByUserEmail(user.email));
  }

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider value={{ user, setUser: this.setUser }}>
        <NavBar />
        <Provider store={store}>
          <div
            className="d-flex"
            style={{ minHeight: 'calc(100vh - 3.15rem)' }}
          >
            <SideBar
              items={sideBarItems}
              onMenuToggle={this.handleShowSidebar}
              isMenuOpen={this.state.showSidebar}
            >
              <div className="d-flex align-items-center py-2 border-bottom mb-3">
                <div className="sidebar__icon d-flex align-items-center mx-2">
                  <span>E</span>
                </div>
                <div>
                  <h6 className="mb-0">Espacio de trabajo de Trello</h6>
                  <span style={{ fontSize: '12px' }}>Premiun</span>
                </div>
                <div className="toggler">
                  <button
                    className={`${this.state.showSidebar ? 'btn py-0 px-2 d-flex align-items-center' : 'btn py-0 px-2 d-flex align-items-center rounded-circle'}`}
                    onClick={this.handleShowSidebar}
                  >
                    {this.state.showSidebar ? (
                      <span className="toggler-icon">&lt;</span>
                    ) : (
                      <span className="toggler-icon">&gt;</span>
                    )}
                  </button>
                </div>
              </div>
            </SideBar>
            <div
              className="container-fluid px-0"
              style={{ maxWidth: 'calc(100% - 265px)' }}
            >
              <Route path="/boards/:id" component={Board} />
              <Route path="/users" component={UsersList} />
              <Route path="/users/:id" component={UserInfo} />
            </div>
          </div>
        </Provider>
        <Route path="*" render={() => <Redirect to="/" />} />
      </UserContext.Provider>
    );
  }
}

HomeView.propTypes = {
  user: PropTypes.object,
};

export default HomeView;
