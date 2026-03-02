import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Menu from "./pages/Menu";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import FloatingWhatsApp from "./componentes/FloatingWhatsApp";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contactus" element={<ContactUs />} />
          

        </Routes>

        {/* ⭐ Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
