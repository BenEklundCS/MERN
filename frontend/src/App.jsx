import { useState } from 'react';
import './App.css';
import HomePage from "@/pages/HomePage";
import CreatePage from "@/pages/CreatePage";
import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Box } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box minH={"100vh"}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App;
