import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <div className="intro-card glass">
        <h1>Welcome to <span className="highlight">eBILL</span></h1>
        <p>Your Smart Online Billing & Inventory Management System.</p>
        <p>Manage your business effortlessly — from inventory to instant billing.</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    </div>
  );
}

export default Homepage;

