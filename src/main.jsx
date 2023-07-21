import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/Home";
import { Provider } from "react-redux";
import AuthLayout from "./components/AuthLayout";
import DashBoardLayout from "./components/DashboardLayout";
import "./index.scss";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import Apps from "./pages/Apps";
import Profile from "./pages/Profile";

import { store } from "./store";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />} />

    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Route>

    <Route element={<DashBoardLayout />}>
      <Route path="profile" element={<Profile />} />
      <Route path="dashboard">
        <Route index element={<Dashboard />} />
        <Route path="apps" element={<Apps />} />
        <Route path="apps/:id" element={<Application />} />
      </Route>
    </Route>
  </>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
