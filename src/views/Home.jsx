import { Component } from 'react';
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
