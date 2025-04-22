import React, { useState } from "react";
import ItemCard from "./pages/ItemCard";
import "./App.css";
import menuItems from "./pages/menuItems";

function App() {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState(menuItems);

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    },
    modal: {
      backgroundColor: "#fff",
      padding: 30,
      borderRadius: 8,
      width: "80%",
      maxWidth: 400,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    input: {
      width: "100%",
      padding: 8,
      marginTop: 10,
      fontSize: 16,
    },
    submitButton: {
      padding: "8px 16px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: 4,
    },
    cancelButton: {
      padding: "8px 16px",
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      borderRadius: 4,
    },
  };

  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: "",
  });

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
  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // Also remove from cart if it exists
    setCart((prevCart) => {
      const { [id]: _, ...rest } = prevCart;
      return rest;
    });
  };

  const totalCount = Object.values(cart).reduce((acc, val) => acc + val, 0);

  const totalPrice = items.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const newId = items.length + 1;

    setItems([
      ...items,
      {
        id: newId,
        name: newItem.name,
        price: parseInt(newItem.price),
        image: newItem.image || "assets/no-image.jpg", // default fallback
      },
    ]);
    setNewItem({ name: "", price: "", image: "" });
    setShowForm(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Tea Time</h1>
        <div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              marginRight: 10,
              padding: "8px 16px",
              backgroundColor: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            Add New Item
          </button>

          <button
            onClick={() => setCart({})}
            style={{
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
      </div>

      {showForm && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Add New Item</h2>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
                style={modalStyles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
                style={modalStyles.input}
              />
              <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                <button type="submit" style={modalStyles.submitButton}>
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={modalStyles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="menu_list_container" style={{ marginTop: 30 }}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={cart[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
            onDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </div>

      <hr />
      <h2>Total Items: {totalCount}</h2>
      <h2>Total Price: ₹ {totalPrice}</h2>
    </div>
  );
}

export default App;
