import React, { useState, useEffect } from "react";
import { addSale, getSales } from "../services/salesService";
import { getItems } from "../services/inventoryService"; // We still need this
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function Sell() {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const { currentUser } = useAuth(); // Get the logged-in user

  const fetchData = async () => {
    if (!currentUser) return;
    setSales(await getSales(currentUser.uid)); // Pass userId
    setInventory(await getItems(currentUser.uid)); // Pass userId
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleSell = async (e) => {
    e.preventDefault();
    if (!customer || !item || !currentUser) return alert("Please fill all fields!");
    
    const selected = inventory.find((i) => i.name === item);
    if (!selected) return alert("Item not found in inventory!");
    
    const numQty = Number(qty);
    if (numQty <= 0) return alert("Quantity must be greater than 0");
    if (numQty > selected.quantity) return alert("Not enough stock!");

    const total = numQty * selected.price;
    const sale = {
      customerName: customer,
      item,
      quantity: numQty,
      total,
      date: new Date().toLocaleString("en-IN"), // Indian locale date
    };

    await addSale(sale, currentUser.uid); // Pass userId
    
    // NOTE: We are NOT updating the inventory quantity here.
    // This is a complex operation (a "transaction")
    // For now, we just record the sale.
    
    alert("Sale recorded!");
    setCustomer("");
    setItem("");
    setQty(1);
    fetchData(); // Refresh sales and inventory
  };

  return (
    <div className="glass">
      <h2>Sell Items</h2>
      {/* Sell Form */}
      <form onSubmit={handleSell} className="inventory-form">
        <input placeholder="Customer Name" value={customer}
          onChange={(e) => setCustomer(e.target.value)} required />
        <select value={item} onChange={(e) => setItem(e.target.value)} required>
          <option value="">Select Item</option>
          {inventory.map((i) => (
            <option key={i.id} value={i.name}>
              {i.name} (Stock: {i.quantity}, Price: ₹{i.price})
            </option>
          ))}
        </select>
        <input type="number" placeholder="Quantity" min="1"
          value={qty} onChange={(e) => setQty(e.target.value)} required />
        <button type="submit" className="btn-green">Sell</button>
      </form>

      {/* Sales Records Table */}
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
