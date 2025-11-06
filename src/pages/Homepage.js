import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage glass">
      <h1>Welcome to <span className="highlight">eBILL</span></h1>
      <p>Smart online billing and inventory management system.</p>
      <div className="home-buttons">
        <Link to="/login" className="btn-primary">Login</Link>
        <Link to="/signup" className="btn-green">Sign Up</Link>
      </div>
    </div>
  );
}
