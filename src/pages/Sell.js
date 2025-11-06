import React, { useState, useEffect } from "react";
// Import our NEW function and remove addSale
import { processSaleAndUpdateInventory, getSales } from "../services/salesService";
import { getItems } from "../services/inventoryService";
import { useAuth } from "../context/AuthContext";

export default function Sell() {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(""); // For showing errors
  const [loading, setLoading] = useState(false); // For disabling button
  const { currentUser } = useAuth();

  const fetchData = async () => {
    if (!currentUser) return;
    setSales(await getSales(currentUser.uid));
    setInventory(await getItems(currentUser.uid));
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleSell = async (e) => {
    e.preventDefault();
    setError("");
    if (!customer || !item || !currentUser) return setError("Please fill all fields!");
    
    const selected = inventory.find((i) => i.name === item);
    if (!selected) return setError("Item not found in inventory!");
    
    const numQty = Number(qty);
    if (numQty <= 0) return setError("Quantity must be greater than 0");
    if (numQty > selected.quantity) return setError("Not enough stock!");

    setLoading(true); // Disable button

    // --- THIS IS THE NEW LOGIC ---
    // 1. Calculate the new quantity
    const newQuantity = selected.quantity - numQty;

    // 2. Define the sale object
    const sale = {
      customerName: customer,
      item,
      quantity: numQty,
      total: numQty * selected.price,
      date: new Date().toLocaleString("en-IN"),
    };

    try {
      // 3. Call the new transaction function
      await processSaleAndUpdateInventory(
        sale,
        currentUser.uid,
        selected.id, // Pass the item's unique ID
        newQuantity  // Pass the new calculated quantity
      );
      
      alert("Sale recorded successfully!");
      
      // 4. Reset the form
      setCustomer("");
      setItem("");
      setQty(1);
      fetchData(); // This will refresh both sales AND inventory list

    } catch (err) {
      console.error(err);
      setError(`Sale failed: ${err.message}`);
    }
    
    setLoading(false); // Re-enable button
  };

  return (
    <div className="glass">
      <h2>Sell Items</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSell} className="inventory-form">
        <input 
          placeholder="Customer Name" 
          value={customer}
          onChange={(e) => setCustomer(e.target.value)} required />
        
        <select value={item} onChange={(e) => setItem(e.target.value)} required>
          <option value="">Select Item</option>
          {inventory
            .filter(i => i.quantity > 0) // Only show items in stock
            .map((i) => (
              <option key={i.id} value={i.name}>
                {i.name} (Stock: {i.quantity}, Price: ₹{i.price})
              </option>
          ))}
        </select>
        
        <input 
          type="number" 
          placeholder="Quantity" 
          min="1"
          max={inventory.find(i => i.name === item)?.quantity} // Set max to stock
          value={qty} 
          onChange={(e) => setQty(e.target.value)} required />
        
        <button type="submit" className="btn-green" disabled={loading}>
          {loading ? "Processing..." : "Sell"}
        </button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Sales Records</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Total (₹)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((s) => (
              <tr key={s.id}>
                <td>{s.customerName}</td>
                <td>{s.item}</td>
                <td>{s.quantity}</td>
                <td>{s.total}</td>
                <td>{s.date}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" style={{textAlign: "center"}}>No sales yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
