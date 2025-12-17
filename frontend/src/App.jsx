import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Landing page components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Opportunities from "./components/Opportunities";
import Testimonials from "./components/Testimonials";
import Features from "./components/Features";
import Footer from "./components/Footer";

/* Pages */
import Login from "./pages/login";
import Signup from "./pages/signup";
import VolunteerProfile from "./pages/VolunteerProfile";
import NgoProfile from "./pages/NgoProfile";
import CreateOpportunity from "./pages/createOpportunity";


/* Layout (THIS WAS MISSING) */
import AppLayout from "./components/layout/AppLayout";

/* Landing Page as a composed component (UNCHANGED) */
const LandingPage = () => (
  <>
    <Header />
    <Hero />
    <HowItWorks />
    <Opportunities />
    <Testimonials />
    <Features />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔓 PUBLIC AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 APP PAGES (WITH GLOBAL NAVBAR) */}
        <Route element={<AppLayout />}>
          <Route path="/profile/volunteer" element={<VolunteerProfile />} />
          <Route path="/profile/ngo" element={<NgoProfile />} />
          <Route path="/dashboard" element={<div>Dashboard coming soon</div>} />
          <Route path="/opportunities" element={<CreateOpportunity />} />
          <Route path="/applications" element={<div>Applications</div>} />
          <Route path="/messages" element={<div>Messages</div>} />
        
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
