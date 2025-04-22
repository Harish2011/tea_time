import React from "react";

const ItemCard = ({ item, quantity, onIncrement, onDecrement, onDelete }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "20px",
        borderRadius: "10px",
        maxWidth: "max-content",
        position: "relative",
      }}
    >
      <div>
        <img
          style={{ width: "100px", height: "100px", borderRadius: "10px" }}
          src={item.image}
          alt={item.name}
          width={100}
        />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>₹ {item.price}</p>
        <button className="btn_icon" onClick={onDecrement}>
          -
        </button>
        <span style={{ margin: "0 8px" }}>{quantity}</span>
        <button className="btn_icon" onClick={onIncrement}>
          +
        </button>
      </div>
      <button onClick={onDelete} className="delete_icons">
        Delete
      </button>
    </div>
  );
};

export default ItemCard;
