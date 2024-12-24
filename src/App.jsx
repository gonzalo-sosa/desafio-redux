import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import Home from './views/Home.jsx';

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Home />
      </Switch>
    </>
  );
}

export default App;
