import './App.css';
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
