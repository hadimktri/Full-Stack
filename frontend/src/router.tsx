import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import {
  postsLoader,
  postDetailsLoader,
  userPostsLoader,
  userCommentsLoader,
  userLikedPostsLoader,
  postComments,
} from "../src/utils/Loaders";
import useBoundStore from "./store/Store";
import Layout from "./components/layout/Layout";
import Error from "./pages/Error/Error";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import UpdatePostPage from "./pages/Post/UpdatePostPage";
import CreatePostPage from "./pages/Post/CreatePostPage";
import PostPage from "./pages/Post/PostsPage";
import PostCommentsPage from "./pages/Post/PostCommentsPage";
import PostDetailPage from "./pages/Post/PostDetailPage";
import ProtectedRoute from "./services/ProtectedRoute";
import Profile from "./pages/User/UserProfile";
import UserProfileUpdate from "./pages/User/UserProfileUpdate";
import UserPostsPage from "./pages/User/UserPostsPage";
import UserLikedPosts from "./pages/User/UserLikedPosts";
import UserCommentsPage from "./pages/User/UserCommentsPage";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<PostPage />} loader={postsLoader} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route
          path="create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UpdatePostPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route
          path="postcomments/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostCommentsPage />
            </ProtectedRoute>
          }
          loader={postComments}
        />
          <Route
            path="user/:id"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <UserPostsPage />
              </ProtectedRoute>
            }
            loader={userPostsLoader}
          />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="likes/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserLikedPosts />
            </ProtectedRoute>
          }
          loader={userLikedPostsLoader}
        />
        <Route
          path="userComments/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserCommentsPage />
            </ProtectedRoute>
          }
          loader={userCommentsLoader}
        />
      </Route>
    )
  );
  return router;
};
