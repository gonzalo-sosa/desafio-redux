import { Provider } from 'react-redux';
import './App.css';
import NavBar from './componentes/nav-bar';
import SideBar from './componentes/side-bar';
import BoardsList from './componentes/boards-list';
import configureStore from './store/configureStore.js';

const sideBarItems = [
  { active: true, disabled: false, href: '/', label: 'Home' },
  {
    active: false,
    disabled: false,
    href: '/boards',
    label: 'Sus tableros',
  },
];

const store = configureStore();

function App() {
  return (
    <>
      <NavBar />
      <Provider store={store}>
        <SideBar items={sideBarItems}>
          <BoardsList />
        </SideBar>
      </Provider>
    </>
  );
}

export default App;
