// /* eslint-disable no-unused-expressions */
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import Loader from '../layout/Loader';
// // eslint-disable-next-line react/prop-types
// export default function ProtectedRoute({ children, isAdmin }) {
//   const { isAuthenticated, loading, user } = useSelector(
//     (state) => state.authState
//   );

//   if (!isAuthenticated && !loading) {
//     return <Navigate to="/login" />;
//   }

//   if (isAuthenticated) {
//     if (isAdmin === true && user.role !== 'admin') {
//       return <Navigate to="/" />;
//     }
//     return children;
//   }

//   if (loading) {
//     return <Loader />;
//   }
// }

/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function ProtectedRoute({ children, isAdmin }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';
      const userRole = localStorage.getItem('user.role');
      setIsAuthenticated(isAuthenticated);
      setUserRole(userRole);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
}
