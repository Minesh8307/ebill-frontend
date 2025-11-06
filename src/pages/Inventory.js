import React, { useEffect, useState } from "react";
import { addItem, getItems, deleteItem } from "../services/inventoryService";

function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });

  const fetchItems = async () => setItems(await getItems());

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addItem({
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
    setForm({ name: "", quantity: "", price: "" });
    fetchItems();
  };

  return (
    <div className="inventory glass">
      <h2>Inventory</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Item Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button className="btn-primary">Add Item</button>
      </form>

      <table className="table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.quantity}</td>
              <td>₹{i.price}</td>
              <td><button onClick={() => deleteItem(i.id).then(fetchItems)}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

