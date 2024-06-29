// /* eslint-disable no-unreachable */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useLocation, Navigate } from 'react-router-dom';
// import Loader from '../layout/Loader';

// export default function ProtectedRoute({ children }) {
//   const location = useLocation();
//   const isAuthenticated = !!window.localStorage.getItem('isloggedIn');
//   const userRole = window.localStorage.getItem('user.role');
//   const isAdmin = userRole === 'admin';
//   const isSuperAdmin = userRole === 'superAdmin';
//   const shippingInfo = window.localStorage.getItem('shippingInfo');
//   const loading = !isAuthenticated && !userRole;

//   if (!isAuthenticated && !loading) {
//     return <Navigate to="/login" />;
//   }

//   if (isAuthenticated) {
//     if (isAdmin) {
//       return children;
//     }
//     return <Navigate to="/" />;
//   }
//   if (isAuthenticated) {
//     if (isSuperAdmin) {
//       return children;
//     }
//     return <Navigate to="/" />;
//   }
//   if (shippingInfo !== null) {
//     return children;
//   }
//   return <Navigate to="/" />;

//   if (loading) {
//     return <Loader />;
//   }
// }

/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = !!window.localStorage.getItem('isloggedIn');
  const userRole = window.localStorage.getItem('user.role');
  const isAdmin = userRole === 'admin';
  const isSuperAdmin = userRole === 'superAdmin';
  const shippingInfo = window.localStorage.getItem('shippingInfo');
  const loading = !isAuthenticated && !userRole;

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    if (isAdmin) {
      return children;
    }
    return <Navigate to="/" />;
  }
  if (isAuthenticated) {
    if (isSuperAdmin) {
      return children;
    }
    return <Navigate to="/" />;
  }
  if (shippingInfo !== null) {
    return children;
  }
  return <Navigate to="/" />;

  if (loading) {
    return <Loader />;
  }
}