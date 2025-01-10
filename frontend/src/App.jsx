import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import HomeView from './views/HomeView.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import auth from '@/services/authService';
import { Route } from 'react-router-dom';
import AuthView from './views/AuthView';
import Logout from '@/components/auth/logout';
import ProtectedRoute from './components/common/routes/protected-route.jsx';
import UserContext from '@/context/user-context';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const user = auth.getCurrentUser();
      const initials = user.name
        .toUpperCase()
        .split(new RegExp('[-_.]', 'g'))
        .map((s) => s.charAt(0))
        .join('');
      setUser({ ...user, initials });
    } catch (error) {
      toast.error(error);
    }
  }, []);

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
          <UserContext.Provider value={user}>
            <HomeView />
          </UserContext.Provider>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
