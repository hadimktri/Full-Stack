import useBoundStore from "./store/Store";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/Login.page";
import RegisterPage from "./pages/Auth/Register.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/Create.Post.page";
import UpdatePostPage from "./pages/Post/Update.Post.page";
import ProtectedRoute from "./services/ProtectedRoute";
import UserProfile from "./pages/User/User.porfile";

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import PostPage from "./pages/Post/Post.page";
import { postDetailsLoader, postsLoader } from "./services/PostService";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} errorElement={<NotFound />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="posts" element={<PostPage />} loader={postsLoader} />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UpdatePostPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Landing />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );
  return router;
};
