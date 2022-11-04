import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Menu.module.css"



const Menu = ({ item }) => {

    
    return (

        <Link to={`item/${item.id}`} className={styles.itemBox} >
            <div>
                <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.itemDeets}>
                <strong>{item.name}</strong>
                <p>Php{item.price}</p>
            </div>
        </Link>
    )
}

export default Menu