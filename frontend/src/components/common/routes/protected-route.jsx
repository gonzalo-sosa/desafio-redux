import { Navigate, Route } from 'react-router-dom';
import auth from '@/services/authService';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ redirectTo, children, ...rest }) => {
  return (
    <Route
      {...rest}
      element={!auth.getCurrentUser() ? <Navigate to={redirectTo} /> : children}
    />
  );
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.node,
};

export default ProtectedRoute;
