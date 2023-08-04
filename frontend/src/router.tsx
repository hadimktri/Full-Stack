import useBoundStore from "./store/Store";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/Login.page";
import RegisterPage from "./pages/Auth/Register.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/Create.Post.page";
import UpdatePostPage from "./pages/Post/Update.Post.page";
import ProtectedRoute from "./services/ProtectedRoute";
import Profile from "./pages/Auth/Profile";

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import PostPage from "./pages/Post/Post.page";
import {
  postDetailsLoader,
  postsLoader,
  userCommPostsLoader,
  userLikedPostsLoader,
  userPostsLoader,
} from "./services/PostService";
import CommentsAcordion from "./pages/User/CommentsAcordion";
import Comments from "./pages/User/Comments";

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
          path="profile"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <Profile />
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
        <Route
          path="/posts/user/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          }
          loader={userPostsLoader}
        />
        <Route
          path="/posts/userLiked/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          }
          loader={userLikedPostsLoader}
        />
        <Route
          path="/posts/Commented/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <Comments />
            </ProtectedRoute>
          }
          loader={userCommPostsLoader}
        />
        <Route path="/" element={<Landing />} />
      </Route>
    )
  );
  return router;
};
