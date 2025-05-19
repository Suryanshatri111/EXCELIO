// router/AppRouter.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import App from "./App";
import LoginPage from "./page/Auth/LoginPage";
import SignUp from "./page/Auth/SignUp";
import Home from "./page/Home/Home";
import UserDashboard from "./page/user/dashboard/UserDashboard";
import UserPrivate from "./page/user/UserPrivate";
import ExcelFile from "./page/user/dashboard/ExcelFile";
import Histroy from "./page/user/dashboard/Histroy";
import User from "./page/user/dashboard/User";
import Settings from "./page/user/dashboard/Settings";

const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route
          path="/"
          element={userInfo ? <Navigate to="/dashboard" /> : <Home />}
        />

        <Route path="" element={<UserPrivate />}>
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="excel" element={<ExcelFile />} />
            <Route path="histroy" element={<Histroy />} />
            <Route path="user" element={<User />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Public auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
