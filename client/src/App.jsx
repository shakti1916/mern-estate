import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./conponents/Header";
import Signup from "./pages/Signup";
import PrivateRoute from "./conponents/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-up" element={<Signup/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
