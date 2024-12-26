import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Board from '@/components/board';
import BoardsList from '@/components/boards-list';
import configureStore from '@/store/configureStore';
import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import { loadBoards } from '@/store/boards';
import { addTask } from '@/store/tasks';

const store = configureStore();

class Home extends Component {
  sideBarItems = [
    { active: true, disabled: false, href: '/', label: 'Home' },
    () => (
      <li key={'boards-list'} className="nav-item">
        <BoardsList />
      </li>
    ),
  ];

  componentDidMount() {
    store.dispatch(loadBoards());
    store.dispatch(addTask({ title: 'a', boardId: 91 }));
    store.dispatch(addTask({ title: 'a', boardId: 91 }));
  }

  render() {
    return (
      <Route path="/">
        <NavBar />
        <Provider store={store}>
          <SideBar items={this.sideBarItems} />
          <Route path="/boards/:id" component={Board} />
        </Provider>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Route>
    );
  }
}

export default Home;
