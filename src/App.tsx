import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@/App.scss";
import Home from "@/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
