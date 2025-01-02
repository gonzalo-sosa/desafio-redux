import PropTypes from 'prop-types';

const AuthView = ({ children }) => {
  return (
    <main className="container mt-5 d-flex justify-content-center auth-view">
      {children}
    </main>
  );
};

AuthView.propTypes = {
  children: PropTypes.node,
};

export default AuthView;
