import React, { useEffect, useState } from "react";
import { getItems, updateItem } from "../services/inventoryService";
import { addSale } from "../services/salesService";
import BillCard from "../components/BillCard";

function Sell() {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState("");
  const [selected, setSelected] = useState([]);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    (async () => setItems(await getItems()))();
  }, []);

  const handleAddItem = (item) => {
    setSelected([...selected, { ...item, quantity: 1 }]);
  };

  const handleSell = async () => {
    let total = 0;
    selected.forEach((i) => (total += i.price * i.quantity));

    const saleData = {
      customerName: customer,
      date: new Date().toLocaleString(),
      items: selected,
      total,
    };

    await addSale(saleData);

    // Update inventory quantities
    for (const i of selected) {
      const found = items.find((x) => x.id === i.id);
      if (found) await updateItem(i.id, { quantity: found.quantity - i.quantity });
    }

    setBill(saleData);
  };

  return (
    <div className="sell glass">
      <h2>Sell Items</h2>
      <input placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} />

      <h4>Select Items:</h4>
      {items.map((i) => (
        <button key={i.id} onClick={() => handleAddItem(i)}>
          {i.name} (₹{i.price})
        </button>
      ))}

      <button className="btn-green" onClick={handleSell}>Sell</button>

      {bill && <BillCard bill={bill} />}
    </div>
  );
}

export default Sell;


