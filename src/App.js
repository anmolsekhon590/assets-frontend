import './App.css';
import Assets from './Components/Assets/Assets';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assets" element={<Assets />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
