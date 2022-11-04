import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css"

const Cart = ({ item, dispatch }) => {
    const [disabled, setDisabled] = useState(false)
    const handleDeleteClick = () => {
        dispatch({
            type: "DELETE_CART_ITEM",
            payload: { id: item.id }
        })
        alert("removed from cart!")
    }

    useEffect(() => {
        item.quantity <= 1 ? setDisabled(true) : setDisabled(false)
    }, [item.quantity]
    )

    const handleDecrement = () => {
        dispatch({
            type: "DECREMENT",
            payload: {
                id: item.id
            }
        })
    }

    const handleIncrement = () => {
        dispatch({
            type: "INCREMENT",
            payload: {
                id: item.id
            }
        })
    }


    return (
        <div className={styles.itemBox} >
            <Link to={`/item/${item.id}`} className={styles.link} >
                <div>
                    <img src={item.image} alt={item.name} />
                </div>
                <div>
                    <p>
                       <b>{item.name}</b>
                    </p>
                    <p>
                       Php  {item.price}
                    </p>
                </div>
            </Link>
            <div>
                <button disabled={disabled} onClick={handleDecrement}> - </button>quantity: {item.quantity} <button onClick={handleIncrement}> + </button>
            </div>

            <p>sub-total: {item.price * item.quantity}</p>

            <button onClick={handleDeleteClick} className={styles.remove}>remove</button>
        </div>


    )
}

export default Cart