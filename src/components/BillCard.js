import React from "react";

function BillCard({ bill }) {
  return (
    <div className="bill glass">
      <h3>🧾 eBILL Receipt</h3>
      <p><strong>Customer:</strong> {bill.customerName}</p>
      <p><strong>Date:</strong> {bill.date}</p>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Item</th><th>Qty</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.name}</td>
              <td>{i.quantity}</td>
              <td>₹{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ₹{bill.total}</h4>
    </div>
  );
}

export default BillCard;

