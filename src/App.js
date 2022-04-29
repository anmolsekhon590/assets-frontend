import './App.css';
import Assets from './Components/Assets/Assets';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
