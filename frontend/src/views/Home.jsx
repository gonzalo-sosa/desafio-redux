import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/boards/board';
import BoardsList from '@/components/boards/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import User from '@/components/users/user';
import { loadUsers } from '@/store/users';
import { loadBoards } from '@/store/boards';
import { loadLists } from '@/store/lists';
import { loadCards } from '@/store/cards';
import iconNames from '@/components/common/icons/icon-names';
import LoadIcon from '../components/common/icons/load-icon';

const store = configureStore();

class Home extends Component {
  sideBarItems = [
    { label: 'Tableros', href: '/boards', icon: iconNames.BOARDS },
    { label: 'Miembros', href: '/users', icon: iconNames.USER },
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

  componentDidMount() {
    store.dispatch(loadBoards());
    store.dispatch(loadUsers());
    store.dispatch(loadLists());
    store.dispatch(loadCards());
  }

  state = {
    showSidebar: true,
  };

  handleShowSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    return (
      <Route path="/">
        <NavBar />
        <Provider store={store}>
          <div
            className="d-flex"
            style={{ minHeight: 'calc(100vh - 3.15rem)' }}
          >
            <SideBar
              items={this.sideBarItems}
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
            <div className="container-fluid px-0">
              <Route path="/boards/:id" component={Board} />
              <Route path="/users/:id" component={User} />
            </div>
          </div>
        </Provider>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Route>
    );
  }
}

export default Home;
