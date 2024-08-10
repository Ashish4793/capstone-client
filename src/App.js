import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home'

function App() {
  return (
    <>
    <Routes>
    <Route path="/login" exact element={<Login />} />
    <Route path="/home" exact element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
