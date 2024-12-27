import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/boards/board';
import BoardsList from '@/components/boards/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import { loadBoards } from '@/store/boards';
import { addList } from '@/store/lists';
import { addUser } from '@/store/users';
import UsersList from '@/components/users/users-list';
import User from '@/components/users/user';

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
    store.dispatch(
      addUser({ name: 'gonzalo', email: 'D9mCt@example.com', address: 'CABA' }),
    );
    store.dispatch(addUser({ name: 'agustin' }));
    store.dispatch(addList({ title: 'Lista 1', boardId: 91 }));
    store.dispatch(addList({ title: 'Lista 2', boardId: 91 }));
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
