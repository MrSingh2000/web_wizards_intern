import './App.css';
import UploadImg from './components/UploadImg';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadImg />} />
    </Routes>)
}

export default App;
