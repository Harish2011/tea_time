import React, { useState } from "react";
import ItemCard from "./pages/ItemCard";
import menuItems from "./pages/menuItems";
import "./App.css";

function App() {
  const [cart, setCart] = useState({});

  const handleIncrement = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCart((prev) => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  const totalCount = Object.values(cart).reduce((acc, val) => acc + val, 0);

  const totalPrice = menuItems.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Tea time</h1>

      <div className="menu_list_container">
        {menuItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={cart[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </div>

      <hr />
      <h2>Total Items: {totalCount}</h2>
      <h2>Total Price: ₹ {totalPrice}</h2>
      <button
        onClick={() => setCart({})}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Reset Cart
      </button>
    </div>
  );
}

export default App;
