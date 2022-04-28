import './App.css';
import Asset from './Components/Asset/Asset';
import Assets from './Components/Assets/Assets';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Login /> */}
      <Assets />
    </div>
  );
}

export default App;
