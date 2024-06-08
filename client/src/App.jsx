import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Profile, SignIn, SignUp, Feed } from "./pages";
import { Header } from "./components";
import PrivateRoute from "./components/PrivateRoute";
import { Post } from "./pages/post/Post";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}
