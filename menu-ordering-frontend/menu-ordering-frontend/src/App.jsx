// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/common/Navbar';
// import PrivateRoute from './components/common/PrivateRoute';


// // Admin
// import AdminCategory from './components/admin/AdminCategory';
// import AdminMenuItem from './components/admin/AdminMenuItems';
// import AdminOrders from './components/admin/AdminOrders';

// // User
// import UserCategory from './components/user/UserCategory';
// import UserMenuCategory from './components/user/UserMenuCategory';
// import UserCart from './components/user/UserCart';
// import CartSummary from './components/user/UserCartSummary';
// import UserOrders from './components/user/UserOrders';
// import  Home  from './pages/Home';
// import LoginForm from './components/auth/LoginForm';
// import RegisterForm from './components/auth/RegisterForm';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<Home/>} />
//         <Route path="/login" element={<LoginForm />}/>
//         <Route path="/register" element={<RegisterForm />} />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/categories"
//           element={
//             <PrivateRoute>
//               <AdminCategory />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/menu"
//           element={
//             <PrivateRoute>
//               <AdminMenuItem />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/orders"
//           element={
//             <PrivateRoute>
//               <AdminOrders />
//             </PrivateRoute>
//           }
//         />

//         {/* User Routes */}
//         <Route
//           path="/user/categories"
//           element={
//             <PrivateRoute>
//               <UserCategory />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/user/menu/:categoryId"
//           element={
//             <PrivateRoute>
//               <UserMenuCategory />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/user/cart"
//           element={
//             <PrivateRoute>
//               <UserCart />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/user/cart/summary"
//           element={
//             <PrivateRoute>
//               <CartSummary />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/user/orders"
//           element={
//             <PrivateRoute>
//               <UserOrders />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

// Admin
import AdminCategory from './components/admin/AdminCategory';
import AdminMenuItem from './components/admin/AdminMenuItems';
import AdminOrders from './components/admin/AdminOrders';

// User
import UserCategory from './components/user/UserCategory';
import UserMenuCategory from './components/user/UserMenuCategory';
import UserCart from './components/user/UserCart';
import CartSummary from './components/user/UserCartSummary';
import UserOrders from './components/user/UserOrders';

import Home from './pages/Home';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { getToken } from './utils/token';

function App() {
  const token = getToken();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <LoginForm /> : <Home />} />
        <Route path="/register" element={!token ? <RegisterForm /> : <Home />} />

        {/* Admin Routes */}
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <AdminCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <PrivateRoute>
              <AdminMenuItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <AdminOrders />
            </PrivateRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/categories"
          element={
            <PrivateRoute>
              <UserCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/menu/:categoryId"
          element={
            <PrivateRoute>
              <UserMenuCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <PrivateRoute>
              <UserCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/cart/summary"
          element={
            <PrivateRoute>
              <CartSummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <PrivateRoute>
              <UserOrders />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

