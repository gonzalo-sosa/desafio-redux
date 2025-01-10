import PropTypes from 'prop-types';
import LoginForm from '../components/auth/login-form';
import RegisterForm from '../components/auth/register-form';

const AuthView = ({ type }) => {
  return (
    <main className="container d-flex justify-content-center auth-view">
      {type === 'login' && <LoginForm />}
      {type === 'register' && <RegisterForm />}
    </main>
  );
};

AuthView.propTypes = {
  type: PropTypes.oneOf(['login', 'register']).isRequired,
};

export default AuthView;
