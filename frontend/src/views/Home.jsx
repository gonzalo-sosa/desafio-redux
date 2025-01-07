import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/boards/board';
import BoardsList from '@/components/boards/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import User from '@/components/users/user';
import DropDown from '@/components/common/drop-down';
import { loadUsers } from '@/store/users';
import { loadBoards } from '@/store/boards';
import { loadLists } from '@/store/lists';
import { loadCards } from '@/store/cards';

const store = configureStore();

class Home extends Component {
  sideBarItems = [
    { label: 'Tableros', href: '/boards', icon: '/icons/boards.svg' },
    { label: 'Miembros', href: '/users', icon: '/icons/user.svg' },
    {
      label: 'Ajustes del Espacio de trabajo',
      href: '/settings',
      icon: '/icons/settings.svg',
    },
    () => (
      <li key={'divider'} className="sidebar__nav__item sidebar__header">
        <DropDown label={'Vistas del Espacio de trabajo'} items={[]} />
      </li>
    ),
    { label: 'Tabla', href: '/table', icon: '/icons/table.svg' },
    { label: 'Calendario', href: '/calendar', icon: '/icons/calendar.svg' },
    () => (
      <li key={'boards-list'} className="sidebar__nav__item sidebar__header">
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
            style={{ minHeight: 'calc(100vh - 3.75rem)' }}
          >
            <SideBar
              items={this.sideBarItems}
              onMenuToggle={this.handleShowSidebar}
              isMenuOpen={this.state.showSidebar}
            >
              <div className="d-flex align-items-center py-2 border-bottom mb-3">
                <div className="sidebar__icon mx-2">
                  <span className="fs-4 bold mb-1">E</span>
                </div>
                <div>
                  <h6 className="mb-0 text-light">
                    Espacio de trabajo de Trello
                  </h6>
                  <span className="text-white" style={{ fontSize: '12px' }}>
                    Premiun
                  </span>
                </div>
                <div className="toggler">
                  <button
                    className={`${this.state.showSidebar ? 'btn' : 'btn rounded-circle'}`}
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
            <div className="container-fluid ps-0">
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
