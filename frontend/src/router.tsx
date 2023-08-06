import useBoundStore from "./store/Store";
import PrivateLayout from "./components/layout/Private.Layout";
import LoginPage from "./pages/Auth/Login.page";
import RegisterPage from "./pages/Auth/Register.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/Create.Post.page";
import UpdatePostPage from "./pages/Post/Update.Post.page";
import ProtectedRoute from "./services/ProtectedRoute";
import Profile from "./pages/User/User.Profile";
import Comments from "./pages/Post/Post.Comments.page";
import UserLikedPosts from "./pages/User/User.Liked.Posts";
import PostPage from "./pages/Post/Posts.page";
import PublicLayout from "./components/layout/Public.Layout";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import {
  postDetailsLoader,
  postsLoader,
  userCommentedPostsLoader,
  userLikedPostsLoader,
  userPostsLoader,
} from "./services/PostService";
import UserLayout from "./components/layout/Uaer.Layout";
import UserProfileUpdate from "./pages/User/User.profile.update";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        //Public Routing
        <Route path="/" element={<PublicLayout />} errorElement={<NotFound />}>
          <Route index element={<PostPage />} loader={postsLoader} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Route>
        //Private Routing
        <Route
          path="posts"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PostPage />} loader={postsLoader} />
          <Route path="create" element={<CreatePostPage />} />
          <Route
            path=":id"
            element={<UpdatePostPage />}
            loader={postDetailsLoader}
          />
          // user //
          <Route
            path="user"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path=":id" element={<PostPage />} loader={userPostsLoader} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<UserProfileUpdate />} />
            <Route
              path="likes/:id"
              element={<UserLikedPosts />}
              loader={userLikedPostsLoader}
            />
            <Route
              path="comments/:id"
              element={<Comments />}
              loader={userCommentedPostsLoader}
            />
          </Route>
        </Route>
      </>
    )
  );
  return router;
};
