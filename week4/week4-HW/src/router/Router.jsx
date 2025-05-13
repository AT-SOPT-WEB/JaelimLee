import { createBrowserRouter } from "react-router";
import MyPage from "../pages/MyPage/MyPage";
import Login from "../pages/Login/Login";
import Signin from "../pages/Signin/Signin";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/mypage/:name", element: <MyPage /> },
  { path: "/sign", element: <Signin /> },
]);

export default router;
