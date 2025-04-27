import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Landing from "./pages/landing.jsx";
import SignUp from "./components/signup.jsx";
import Navbar from "./components/navbar.jsx";
import Booking from "./components/booking.jsx";
import Chefs from "./components/allchefs.jsx";
import Login from "./components/login.jsx";
import CustomerDashboard from "./components/customerdashboard.jsx";
import ChefDashboard from "./components/chefdashboard.jsx";
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-chef" element={<Booking />} />
        <Route path="/all-chefs" element={<Chefs />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/chefdashboard" element={<ChefDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;