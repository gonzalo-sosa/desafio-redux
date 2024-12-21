import { Provider } from 'react-redux';
import './App.css';
import NavBar from './componentes/nav-bar';
import SideBar from './componentes/side-bar';
import BoardsList from './componentes/boards-list';
import configureStore from './store/configureStore.js';

const sideBarItems = [
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

const store = configureStore();

function App() {
  return (
    <>
      <NavBar />
      <Provider store={store}>
        <SideBar items={sideBarItems} />
      </Provider>
    </>
  );
}

export default App;
