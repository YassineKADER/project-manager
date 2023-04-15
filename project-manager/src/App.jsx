import Login from "./components/Login";
import Signup from "./components/Signup";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="signup" element={<Signup></Signup>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
