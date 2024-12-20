import { Provider } from 'react-redux';
import './App.css';
import NavBar from './componentes/nav-bar';
import SideBar from './componentes/side-bar';
import configureStore from './store/configureStore.js';
import Board from './componentes/board';
import BoardsList from './componentes/boars-list';

const store = configureStore();

function App() {
  return (
    <>
      <NavBar />
      <Provider store={store}>
        <SideBar
          items={[{ active: false, disabled: false, href: '/', label: 'Hola' }]}
        >
          <BoardsList />
        </SideBar>
        <Board />
      </Provider>
    </>
  );
}

export default App;
