



// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { lazy, Suspense } from 'react';
// import Footer from './layout/Footer';
// import Header from './layout/Header';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


// const OrdersHistory = lazy(() => import('pages/order/OrderHistory'))
// const UsersList = lazy(() => import('pages/user/UserList'))
// const RestaurantTable = lazy(() => import('./pages/restaurant/Restaurant'))
// const UpdateMenu = lazy(() => import('pages/menu/UpdateSingleMenu'))
// const MenuList = lazy(() => import('pages/menu/MenuList'))
// const Payment = lazy(() => import('./pages/payment/Payment'))
// const HomePage = lazy(() => import('./pages/home/home'))
// const LoginPage = lazy(() => import('./pages/auth/login/login'))
// const SendLoginOtp = lazy(() => import('./pages/auth/login/SendLoginOtp'))
// const LoginWithOtp = lazy(() => import('./pages/auth/login/loginWithOtp'))
// const DashboardPage = lazy(() => import('./pages/dashboard/dashboard'))
// const ResetPassword = lazy(() => import('./pages/auth/resetPassword/resetPassword'))
// const ForgotPasswordPage = lazy(() => import('./pages/auth/forgotPassword'))
// const ConfirmOrder = lazy(() => import('./pages/order/ConfirmOrder'))
// const OrderSuccess = lazy(() => import('./pages/order/OrderSuccess'))
// const OrderDetails = lazy(() => import('./pages/order/OrderDetails'))
// const OrderStatus = lazy(() => import('./pages/order/OrderStatus'))
// const OrdersTable = lazy(() => import('./pages/order/ActiveOrderList'))
// const CreateMenu = lazy(() => import('./pages/menu/CreateMenu'))
// const Profile = lazy(() => import('./pages/user/Profile'))
// const SignUpForm = lazy(() => import('./pages/auth/register/Signup'))
// const Home = lazy(() => import('pages/home/mainHome'))
// const CreateRestaurant = lazy(() => import('pages/restaurant/CreateRestaurant'))
// const EditRestaurant = lazy(() => import('pages/restaurant/UpdateRestaurant'))
// const CreateAdmin = lazy(() => import('pages/admin/CreateAdmin'))
// const CarouselForm = lazy(() => import('pages/carousal/CreateCarousal'))
// const CarousalTable = lazy(() => import('pages/carousal/ListCarousal'))
// const UpdateCarousal = lazy(() => import('pages/carousal/UpdateCarousal'))
// const ShippingInfo1 = lazy(() => import('pages/order/shippingInfo/ShippingInfo'))
// const RegistrationSuccess = lazy(() => import('pages/auth/register/RegistrationSuccess'))
// const LocationComponent = lazy(() => import('pages/location/Location'))
// const UpdateProfile = lazy(() => import('pages/user/UpdateProfile'))
// const CustomerList = lazy(() => import('pages/user/CustomerList'))
// const Cart = lazy(() => import('./pages/order/cart'))
// const Landing = lazy(() => import('pages/home/LandingPage/Home'))
// const OrdersTable1 = lazy(() => import('pages/order/UserOrderList'))
// const ProtectedRoute = lazy(() => import('routes/protectedRoute'))
// const PrivateRoute = lazy(() => import('components/PrivateRoute'))



// function App() {
//   const loggedIn = window.localStorage.getItem('isloggedIn' || null);
//   const [stripeApiKey, setStripeApiKey] = useState('');
//   useEffect(() => {
//     async function getStripeApiKey() {
//       try {
//         const { data } = await axios.get('/api/stripeapi');
//         setStripeApiKey(data.stripeApiKey);
//       } catch (error) {
//         console.log(error)
//       }
//     } 
//     getStripeApiKey();
//   }, []);

//   return (
//     <Router>
//       <div className="App bg-dark">
//         <HelmetProvider>
//           <div className="header">
//             <Header />
//           </div>
//           <Suspense fallback={<div className='text-white'>Loading...</div>}>
//             <Routes>
//               <Route element={loggedIn ? <HomePage /> : <LoginPage />} />
//               <Route path="/select" element={<HomePage />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/login/otp" element={<SendLoginOtp />} />
//               <Route path="/loginWithOtp" element={<LoginWithOtp />} />
//               <Route path="/signup" element={<SignUpForm />} />
//               < Route path="/" element={<Landing />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/password/forgot" element={<ForgotPasswordPage />} />
//               <Route path="/api/verify-email/:token" element={<RegistrationSuccess />} />
//               <Route path="/shippingInfo" element={<ShippingInfo1 />} />
//               <Route path="/api/password/reset/:token" element={<ResetPassword />} />
//               <Route path="/location" element={<LocationComponent />} />
//               <Route path="/userOrderList" element={<ProtectedRoute><OrdersTable1 /></ProtectedRoute>} />
//               <Route path="/order/confirm" element={
//                 <PrivateRoute>
//                   <ConfirmOrder />
//                 </PrivateRoute>

//               }
//               />
//               <Route
//                 path="/order/success"
//                 element={

//                   <OrderSuccess />

//                 }
//               />
//               <Route
//                 path="/order/:id"
//                 element={
//                   <ProtectedRoute>
//                     <OrderDetails />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/myProfile/:id"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>


//                 }
//               />
//               <Route
//                 path="/updateProfile/:id"
//                 element={
//                   <ProtectedRoute>
//                     <UpdateProfile />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <DashboardPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/orderHistory"
//                 element={
//                   <ProtectedRoute>
//                     <OrdersHistory />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/orders"
//                 element={
//                   <ProtectedRoute>
//                     <OrdersTable />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/order/:id"
//                 element={
//                   <ProtectedRoute>
//                     <OrderStatus />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/carousel/new"
//                 element={
//                   <ProtectedRoute>
//                     <CarouselForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/carousel/list"
//                 element={
//                   <ProtectedRoute>
//                     <CarousalTable />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/create"
//                 element={
//                   <ProtectedRoute>
//                     <CreateAdmin />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/updateCarousal/:id"
//                 element={
//                   <ProtectedRoute>
//                     <UpdateCarousal />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/create/restaurant"
//                 element={
//                   <ProtectedRoute>
//                     <CreateRestaurant />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/updateMenu/:id"
//                 element={
//                   <ProtectedRoute>
//                     <UpdateMenu />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/updateRestaurant/:id"
//                 element={
//                   <ProtectedRoute>
//                     <EditRestaurant />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/users"
//                 element={
//                   <ProtectedRoute>
//                     <UsersList />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/menus"
//                 element={
//                   <ProtectedRoute>
//                     <MenuList />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/createMenu"
//                 element={
//                   <ProtectedRoute>
//                     <CreateMenu />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/customer/list"
//                 element={
//                   <ProtectedRoute>
//                     <CustomerList />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/restaurants"
//                 element={
//                   <ProtectedRoute>
//                     <RestaurantTable />
//                   </ProtectedRoute>
//                 }
//               />
//               {stripeApiKey && (
//                 <Route
//                   path="/payment"
//                   element={
//                     <PrivateRoute>
//                       <Elements stripe={loadStripe(stripeApiKey)}>
//                         <Payment />
//                       </Elements>
//                     </PrivateRoute>
//                   }
//                 />
//               )}
//             </Routes>
//           </Suspense>
//           <Footer />
//         </HelmetProvider>
//       </div>
//     </Router>
//   );
// }

// export default App;


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect, useState } from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import "./App.css";

const OrdersHistory = lazy(() => import('pages/order/OrderHistory'))
const UsersList = lazy(() => import('pages/user/UserList'))
const RestaurantTable = lazy(() => import('./pages/restaurant/Restaurant'))
const UpdateMenu = lazy(() => import('pages/menu/UpdateSingleMenu'))
const MenuList = lazy(() => import('pages/menu/MenuList'))
const HomePage = lazy(() => import('./pages/home/home'))
const LoginPage = lazy(() => import('./pages/auth/login/login'))
const SendLoginOtp = lazy(() => import('./pages/auth/login/SendLoginOtp'))
const LoginWithOtp = lazy(() => import('./pages/auth/login/loginWithOtp'))
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard'))
const ResetPassword = lazy(() => import('./pages/auth/resetPassword/resetPassword'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgotPassword'))
const ConfirmOrder = lazy(() => import('./pages/order/ConfirmOrder'))
const OrderSuccess = lazy(() => import('./pages/order/OrderSuccess'))
const OrderDetails = lazy(() => import('./pages/order/OrderDetails'))
const OrderStatus = lazy(() => import('./pages/order/OrderStatus'))
const OrdersTable = lazy(() => import('./pages/order/ActiveOrderList'))
const CreateMenu = lazy(() => import('./pages/menu/CreateMenu'))
const Profile = lazy(() => import('./pages/user/Profile'))
const SignUpForm = lazy(() => import('./pages/auth/register/Signup'))
const Home = lazy(() => import('pages/home/mainHome'))
const CreateRestaurant = lazy(() => import('pages/restaurant/CreateRestaurant'))
const EditRestaurant = lazy(() => import('pages/restaurant/UpdateRestaurant'))
const CreateAdmin = lazy(() => import('pages/admin/CreateAdmin'))
const CarouselForm = lazy(() => import('pages/carousal/CreateCarousal'))
const CarousalTable = lazy(() => import('pages/carousal/ListCarousal'))
const UpdateCarousal = lazy(() => import('pages/carousal/UpdateCarousal'))
const ShippingInfo1 = lazy(() => import('pages/order/shippingInfo/ShippingInfo'))
const RegistrationSuccess = lazy(() => import('pages/auth/register/RegistrationSuccess'))
const LocationComponent = lazy(() => import('pages/location/Location'))
const UpdateProfile = lazy(() => import('pages/user/UpdateProfile'))
const CustomerList = lazy(() => import('pages/user/CustomerList'))
const Cart = lazy(() => import('./pages/order/cart'))
const Landing = lazy(() => import('pages/home/LandingPage/Home'))
const OrdersTable1 = lazy(() => import('pages/order/UserOrderList'))
const ProtectedRoute = lazy(() => import('routes/protectedRoute'))
const PrivateRoute = lazy(() => import('components/PrivateRoute'))
const PaymentPage = lazy(() => import('./pages/payment/Payment'))
const Settings = lazy(() => import('./pages/admin/Settings'))
const LandingPageMain = lazy(() => import('pages/home/LandingPageMain/Main'))

function App() {
  const loggedIn = window.localStorage.getItem('isloggedIn' || null);
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    async function getStripeApiKey() {
      try {
        const { data } = await axios.get('/api/stripeapi');
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.log(error)
      }
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App " style={{minHeight: '100vh'}}>
        <HelmetProvider>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '64vh' }}>
            <div style={{ flex: '1' }}>
          <Suspense fallback={<div className='text-white'>Loading...</div>}>
            <Routes>
              <Route element={loggedIn ? <HomePage /> : <LoginPage />} />
              <Route path="/select" element={<HomePage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<LandingPageMain />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/otp" element={<SendLoginOtp />} />
              <Route path="/loginWithOtp" element={<LoginWithOtp />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/home1" element={<Landing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/password/forgot" element={<ForgotPasswordPage />} />
              <Route path="/api/verify-email/:token" element={<RegistrationSuccess />} />
              <Route path="/shippingInfo" element={<ShippingInfo1 />} />
              <Route path="/api/password/reset/:token" element={<ResetPassword />} />
              <Route path="/location" element={<LocationComponent />} />
              <Route path="/userOrderList" element={<ProtectedRoute><OrdersTable1 /></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
              <Route path="/myProfile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/updateProfile/:id" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/timeSlot" element={<ProtectedRoute><TimeSlotManager /></ProtectedRoute>} />
              <Route path="/admin/orderHistory" element={<ProtectedRoute><OrdersHistory /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute><OrdersTable /></ProtectedRoute>} />
              <Route path="/admin/order/:id" element={<ProtectedRoute><OrderStatus /></ProtectedRoute>} />
              <Route path="/admin/carousel/new" element={<ProtectedRoute><CarouselForm /></ProtectedRoute>} />
              <Route path="/admin/carousel/list" element={<ProtectedRoute><CarousalTable /></ProtectedRoute>} />
              <Route path="/admin/create" element={<ProtectedRoute><CreateAdmin /></ProtectedRoute>} />
              <Route path="/admin/updateCarousal/:id" element={<ProtectedRoute><UpdateCarousal /></ProtectedRoute>} />
              <Route path="/admin/create/restaurant" element={<ProtectedRoute><CreateRestaurant /></ProtectedRoute>} />
              <Route path="/admin/updateMenu/:id" element={<ProtectedRoute><UpdateMenu /></ProtectedRoute>} />
              <Route path="/admin/updateRestaurant/:id" element={<ProtectedRoute><EditRestaurant /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
              <Route path="/admin/menus" element={<ProtectedRoute><MenuList /></ProtectedRoute>} />
              <Route path="/admin/createMenu" element={<ProtectedRoute><CreateMenu /></ProtectedRoute>} />
              <Route path="/admin/customer/list" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
              <Route path="/admin/restaurants" element={<ProtectedRoute><RestaurantTable /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/email/Confirmation" element={<OpenEmailAppLink/>} />

              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute>
                      <Suspense fallback={<div className='text-white'>Loading Payment...</div>}>
                        <LazyLoadedPayment stripeApiKey={stripeApiKey} />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
              )}
            </Routes>
          </Suspense>
          </div>
          </div>
          <div className=''>
             <Footer />
          </div>
         
        </HelmetProvider>
      </div>
      
    </Router>
  );
}
import { loadStripe } from '@stripe/stripe-js';
import OpenEmailAppLink from 'pages/auth/register/RegistrationVerification';
import TimeSlotManager from 'pages/admin/TimeSlot';

const LazyLoadedPayment = ({ stripeApiKey }) => {
  const Elements = lazy(() => import('@stripe/react-stripe-js').then(module => ({ default: module.Elements })));
  return (
    <Suspense fallback={<div className='text-white'>Loading Stripe...</div>}>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <PaymentPage />
      </Elements>
    </Suspense>
  );
};

export default App;
