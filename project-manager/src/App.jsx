import { AuthContextProvider } from "./components/context/AuthContext";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./components/pages/Mainpage";
import { Protected } from "./components/Protected";
import { ResetPassword } from "./components/pages/ResetPassword";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Mainpage></Mainpage>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="resetpassword" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="home" element={<Protected><Home></Home></Protected>}></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
