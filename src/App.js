import React, { useEffect, useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";




function App() {
  const Layout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/myorder", element: <OrdersPage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/signin", element: <LoginPage /> },
        { path: "/signup", element: <RegisterPage /> },
        { path: "*", element: <NotFoundPage /> }
      ]
    }
  ]);
  return (
    <div className="App">
      {/* Define your ContextProvider */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* <header>
        <Navbar />
      </header> */}
      <RouterProvider router={router} />


    </div>
  );
}

export default App;
