import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="glass">
      <h2>Dashboard</h2>
      <div className="home-buttons">
        <Link to="/sell" className="btn-primary">Sell</Link>
        <Link to="/inventory" className="btn-green">Inventory</Link>
      </div>
    </div>
  );
}


