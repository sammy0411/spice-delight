import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        maxHeight: "360px",
        backgroundColor: "#1E2019",
        transition: "transform 0.5s",
        transformOrigin: "center",
        borderRadius: "10px",
      }}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt="Card cap"
        style={{ height: "150px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select
            className="m-2 h-100 rounded"
            style={{ backgroundColor: "#4C230A", fontSize: "16px" }}
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 rounded"
            style={{ backgroundColor: "#4C230A", fontSize: "16px" }}
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">Rs {finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn ms-2 justify-center"
          style={{
            backgroundColor: "#280004",
            transition: "background-color 0.5s, transform 0.5s",
            padding: "10px 20px",
            fontSize: "16px",
            transformOrigin: "center",
          }}
          onClick={handleAddToCart}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#A53F2B";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#280004";
            e.target.style.transform = "scale(1)";
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
