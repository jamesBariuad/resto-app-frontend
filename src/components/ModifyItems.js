import React, { useState } from 'react'
import styles from "./ModifyItems.module.css"


const ModifyItems = ({ item, dispatch, handleAddToCartClick }) => {
    const [editItem, setEditItem] = useState(
        {
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image,
            desc: item.desc
        }
    )

    const [toggle, setToggle] = useState(true)


    const onChange = (e) => {
        const inputName = e.target.name;

        switch (inputName) {
            case "name":
                setEditItem({
                    ...editItem,
                    name: e.target.value,
                });
                break;
            case "price":
                setEditItem({
                    ...editItem,
                    price: Number(e.target.value),
                });
                break;
            case "category":
                setEditItem({
                    ...editItem,
                    category: e.target.value,
                });
                break;
            case "image":
                setEditItem({
                    ...editItem,
                    image: e.target.value,
                });
                break;
            case "description":
                setEditItem({
                    ...editItem,
                    desc: e.target.value,
                });
                break;
            default:
                break;
        }
    };

    const handleEditClick = () => {
        setToggle(true)
        dispatch({
            type: "EDIT_ITEM",
            payload: {
                id: item.id,
                name: editItem.name,
                price: editItem.price,
                category: editItem.category, 
                image: editItem.image,
                desc: editItem.desc
            }
        })

        alert("edit success!")
    }

    const handleDeleteClick = () => {
        dispatch({
            type: "DELETE_ITEM",
            payload: { id: item.id }
        })


        alert("item deleted!")
    }

    return (

        <div className={styles.forSale}>
            {
                toggle ?
                    <div className={styles.displayEdit}>
                        <div>
                            <img src={item.image} alt={item.name}></img>
                        </div>
                        <div>
                            <b>{item.name}</b>
                            <br></br>
                            <b>price: </b>{item.price}
                            <br></br>
                            <b>category:</b> {item.category}
                            <br />
                            <b>description:</b> {item.desc}
                            <br />
                        </div>
                        <button onClick={() => setToggle(false)}>Edit</button>
                        <button onClick={handleDeleteClick} className={styles.remove}>Delete Item</button>
                    </div>
                    :
                    <div>
                        <h2>Edit Item</h2>
                        <p>name:</p><input type="text" value={editItem.name} name="name" onChange={onChange}></input>
                        <p>price:</p><input type="number" value={editItem.price} name="price" onChange={onChange}></input>
                        <p>category:</p><input type="text" value={editItem.category} name="category" onChange={onChange}></input>
                        <p>image:</p><input type="text" value={editItem.image} name="image" onChange={onChange}></input>
                        <p>description:</p><textarea type="text" value={editItem.desc} name="description" onChange={onChange} />
                        <br></br>

                        <button onClick={handleEditClick}>submit edit</button>
                        <button onClick={() => setToggle(true)}>Cancel</button>
                    </div>}

        </div>
    )
}

export default ModifyItems