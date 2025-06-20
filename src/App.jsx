import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/pages/Login';
import Cadastro from './assets/pages/Cadastro';
import Home from './assets/pages/HomePage/Home';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;