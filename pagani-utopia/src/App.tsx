import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { HomePage } from './pages/HomePage';
import PerformanceCluster from './sections/PerformanceCluster';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/performance" element={<PerformanceCluster />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
