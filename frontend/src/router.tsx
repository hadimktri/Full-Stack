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
} from "../src/utils/Loaders";
import useBoundStore from "./store/Store";
import LoginPage from "./pages/Auth/Loginpage";
import RegisterPage from "./pages/Auth/Registerpage";
import CreatePostPage from "./pages/Post/CreatePostpage";
import UpdatePostPage from "./pages/Post/UpdatePostpage";
import Profile from "./pages/User/UserProfile";
import Comments from "./pages/Post/PostCommentspage";
import UserLikedPosts from "./pages/User/UserLikedPosts";
import PostPage from "./pages/Post/Postspage";
import Layout from "./components/layout/Layout";
import UserProfileUpdate from "./pages/User/UserProfileUpdate";
import UserPostsPage from "./pages/User/UserPostsPage";
import ProtectedRoute from "./services/ProtectedRoute";
import Error from "./pages/Error/Error";
import PostDetailPage from "./pages/Post/PostDetailpage";

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
          path="user/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserPostsPage />
            </ProtectedRoute>
          }
          loader={userPostsLoader}
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
          path="comments/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <Comments />
            </ProtectedRoute>
          }
          loader={userCommentsLoader}
        />
      </Route>
    )
  );
  return router;
};
