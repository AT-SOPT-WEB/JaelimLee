import { createBrowserRouter } from "react-router";
import MyPage from "../pages/MyPage/MyPage";
import Login from "../pages/Login/Login";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/mypage/:name", element: <MyPage /> },
]);

export default router;
