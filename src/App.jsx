import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { isAuthReady, login } from "./app/features/userSlice";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";
import Profile from "./pages/Profile";
import UserInfo from "./pages/userInfo";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/create",
          element: <CreateTask />,
        },
        {
          path: "/userInfo/:id",
          element: <UserInfo />,
        },
        {
          path: "/task/:id",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
