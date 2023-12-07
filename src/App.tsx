import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import './App.css'
import { RequireAuth } from "./components/AuthComponent";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
            <Route path={"/"} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
