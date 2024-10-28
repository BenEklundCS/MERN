import { useState } from 'react';
import './App.css';
import HomePage from "@/pages/HomePage";
import CreatePage from "@/pages/CreatePage";
import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar>Navbar</Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App;
