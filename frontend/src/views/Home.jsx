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
      <li key={'divider'} className="nav-item">
        <DropDown label={'Vistas del Espacio de trabajo'} items={[]} />
      </li>
    ),
    { label: 'Tabla', href: '/table', icon: '/icons/table.svg' },
    { label: 'Calendario', href: '/calendar', icon: '/icons/calendar.svg' },
    () => (
      <li key={'boards-list'} className="nav-item">
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

  handleShowSidebar = () => {};

  render() {
    return (
      <Route path="/">
        <NavBar />
        <Provider store={store}>
          <div className="container-fluid px-0">
            <div className="row">
              <div className="col-md-2 col-3 pe-0">
                <SideBar
                  items={this.sideBarItems}
                  onMenuToggle={this.handleShowSidebar}
                  isMenuOpen={this.state.showSidebar}
                >
                  <div className="d-flex align-items-center py-2 border-bottom">
                    <div className="side-bar--icon me-2">
                      <span>E</span>
                    </div>
                    <div>
                      <h6>Espacio de trabajo de Trello</h6>
                      <span>Premiun</span>
                    </div>
                    <div>
                      {this.state.showSidebar ? (
                        <span>&lt;</span>
                      ) : (
                        <span>&gt;</span>
                      )}
                    </div>
                  </div>
                </SideBar>
              </div>
              <div className="col-md-10 col-9  ps-0">
                <Route path="/boards/:id" component={Board} />
                <Route path="/users/:id" component={User} />
              </div>
            </div>
          </div>
        </Provider>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Route>
    );
  }
}

export default Home;
