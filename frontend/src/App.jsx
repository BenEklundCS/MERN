import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Box min={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
        <Route path='/my_route' element={<MyPage />} />
			</Routes>
		</Box>
	);
}

export default App;