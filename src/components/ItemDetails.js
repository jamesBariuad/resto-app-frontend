import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./ItemDetails.module.css";

const ItemDetails = ({ forSaleItems, cartItems, handleAddToCartClick }) => {
  const { id } = useParams();

  const item = forSaleItems.filter((item) => item.id === id);
  const inCart = cartItems.filter((item) => item.id === id);
  // console.log(inCart)
  const quantity = inCart.length === 0 ? 0 : inCart[0]?.quantity;

  const [counter, setCounter] = useState(1);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    counter <= 1 ? setDisplay(true) : setDisplay(false);
  }, [counter]);

  const addCart = () => {
    handleAddToCartClick(id, counter);
    setCounter(1);
  };

  return (
    <div className={styles.background}>
      <div className={styles.deets}>
        <div>
          <h2>{item[0]?.name}</h2>
          <img
            src={item[0]?.image}
            alt={item[0]?.name}
            className={styles.itemImage}
          />
          <br></br>
          <strong>Php {item[0]?.price}</strong>
        </div>

        <p className={styles.desc}>
          <b>Description: </b>
          <br />
          {item[0]?.desc}
        </p>

        <div>
          <button disabled={display} onClick={() => setCounter(counter - 1)}>
            {" "}
            -{" "}
          </button>
          {counter} <button onClick={() => setCounter(counter + 1)}>+</button>
          <br></br>
          <button onClick={addCart}>Add To Cart</button>
          <br></br>
          <p>quantity in cart: {quantity} </p>
        </div>
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
            alt="x"
            className={styles.x}
          />
        </Link>
      </div>
    </div>
  );
};

export default ItemDetails;
