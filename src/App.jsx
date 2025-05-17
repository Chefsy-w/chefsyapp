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
import { useState } from "react";
import { getUserSession } from "./core/utils/index.js";
import NotFound from "./components/notfound.jsx";
function App() {
  const [userSession] = useState(getUserSession());

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {!userSession ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/all-chefs" element={<Chefs />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/chef-dashboard" element={<ChefDashboard />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
