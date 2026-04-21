import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Design } from './pages/Design';
import { Performance } from './pages/Performance';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
