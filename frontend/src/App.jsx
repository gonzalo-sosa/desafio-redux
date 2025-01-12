import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import HomeView from './views/HomeView.jsx';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import AuthView from './views/AuthView';
import Logout from '@/components/auth/logout';
import ProtectedRoute from './components/common/routes/protected-route.jsx';

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Switch>
          <Route
            path="/login"
            render={(props) => <AuthView type="login" {...props} />}
          />
          <Route
            path="/register"
            render={(props) => <AuthView type="register" {...props} />}
          />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute redirectTo={'/register'} path="/">
            <HomeView />
          </ProtectedRoute>
        </Switch>
      </>
    );
  }
}

export default App;
