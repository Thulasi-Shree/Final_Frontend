// /* eslint-disable react/prop-types */
// import { Navigate } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//   const shippingInfo = window.localStorage.getItem('shippingInfo');

//   if (shippingInfo !== null) {
//     return children;
//   }
//   return <Navigate to="/" />;
// }

/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const shippingInfo = window.localStorage.getItem('shippingInfo');

  if (shippingInfo !== null) {
    return children;
  }
  return <Navigate to="/" />;
}
