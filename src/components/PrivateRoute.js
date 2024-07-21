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
// import { Navigate } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//   const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));

//   if (shippingInfo !== null) {
//     return children;
//   }
//   return <Navigate to="/" />;
// }
import React, { useLayoutEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useLayoutEffect(() => {
    const shippingInfo = window.localStorage.getItem('shippingInfo');
    if (shippingInfo !== null) {
      setIsAuthorized(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthorized) {
    return children;
  }

  return <Navigate to="/" />;
}
