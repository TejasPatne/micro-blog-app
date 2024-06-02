import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Profile, SignIn, SignUp } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}
