import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/boards/board';
import BoardsList from '@/components/boards/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import UsersList from '@/components/users/users-list';
import User from '@/components/users/user';
import { loadUsers } from '@/store/users';
import { loadBoards } from '@/store/boards';
import { loadLists } from '@/store/lists';
import { loadCards } from '@/store/cards';

const store = configureStore();

class Home extends Component {
  sideBarItems = [
    () => (
      <li key={'boards-list'} className="nav-item">
        <BoardsList />
      </li>
    ),
    () => (
      <li key={'users-list'} className="nav-item">
        <UsersList />
      </li>
    ),
  ];

  componentDidMount() {
    store.dispatch(loadBoards());
    store.dispatch(loadUsers());
    store.dispatch(loadLists());
    store.dispatch(loadCards());
  }

  render() {
    return (
      <Route path="/">
        <NavBar />
        <Provider store={store}>
          <SideBar items={this.sideBarItems} />
          <Route path="/boards/:id" component={Board} />
          <Route path="/users/:id" component={User} />
        </Provider>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Route>
    );
  }
}

export default Home;
