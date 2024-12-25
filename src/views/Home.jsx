import { Component } from 'react';
import { getBoards } from '@/store/boards';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/board';
import BoardsList from '@/components/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';

const store = configureStore();

class Home extends Component {
  sideBarItems = [
    { active: true, disabled: false, href: '/', label: 'Home' },
    () => (
      <li key={'boards-list'} className="nav-item">
        <a href="#" key={'boards-list-link'} className="nav-link text-light">
          Sus tableros
        </a>
        <BoardsList />
      </li>
    ),
  ];

  render() {
    const boards = getBoards(store.getState());

    return (
      <Route path="/">
        <NavBar />
        <Provider store={store}>
          <SideBar items={this.sideBarItems} />
        </Provider>
        {boards.map((board) => (
          <Route
            key={board.id}
            path={`/boards/${board.id}`}
            render={(props) => <Board {...props} board={board} />}
          />
        ))}
        <Route path="*" render={() => <Redirect to="/" />} />
      </Route>
    );
  }
}

export default Home;
