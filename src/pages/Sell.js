import React, { useState, useEffect } from "react";
import { addSale, getSales } from "../services/salesService";
import { getItems, addItem } from "../services/inventoryService";

export default function Sell() {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);

  const fetchData = async () => {
    setSales(await getSales());
    setInventory(await getItems());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSell = async () => {
    const selected = inventory.find((i) => i.name === item);
    if (!selected) return alert("Item not found in inventory!");
    if (qty > selected.quantity) return alert("Not enough stock!");

    const total = qty * selected.price;

    const sale = {
      customerName: customer,
      item,
      quantity: qty,
      total,
      date: new Date().toLocaleString(),
    };

    await addSale(sale);

    alert("Sale recorded successfully!");
    setCustomer("");
    setItem("");
    setQty(1);
    fetchData();
  };

  return (
    <div className="glass">
      <h2>Sell Items</h2>
      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <select value={item} onChange={(e) => setItem(e.target.value)}>
        <option value="">Select Item</option>
        {inventory.map((i) => (
          <option key={i.id} value={i.name}>
            {i.name} (₹{i.price})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSell}>
        Sell
      </button>

      <h3 style={{ marginTop: "20px" }}>Sales Records</h3>
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
            <tr>
              <td colSpan="5">No sales yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



