import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import Home from './views/Home.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import auth from '@/services/authService';
import { Route } from 'react-router-dom';
import LoginForm from '@/components/auth/login-form';
import RegisterForm from '@/components/auth/register-form';
import Logout from '@/components/auth/logout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const user = auth.getCurrentUser();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/logout" component={Logout} />
        <Home user={user} />
      </Switch>
    </>
  );
}

export default App;
