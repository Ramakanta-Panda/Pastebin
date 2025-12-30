import { HashRouter, Routes, Route } from 'react-router-dom';
import CreatePaste from './pages/CreatePaste';
import ViewPaste from './pages/ViewPaste';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </HashRouter>
  );
}
