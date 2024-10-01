import { Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signuppage" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
