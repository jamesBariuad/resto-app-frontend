import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const AddItem = ({ dispatch, forSaleItems, setToggle }) => {
  const [addItem, setAddItem] = useState(
    {
      name: "",
      price: "",
      category: "",
      image: "",
      desc: "",

    }
  )

  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "name":
        setAddItem({
          ...addItem,
          name: e.target.value,
        });
        break;
      case "price":
        setAddItem({
          ...addItem,
          price: Number(e.target.value),
        });
        break;
      case "category":
        setAddItem({
          ...addItem,
          category: e.target.value,
        });
        break;
      case "image":
        setAddItem({
          ...addItem,
          image: e.target.value,
        });
        break;
      case "description":
        setAddItem({
          ...addItem,
          desc: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (forSaleItems.filter(item => item.name === addItem.name).length === 1) {
      return (alert("item name is a duplicate! try again"))
    }

    if (addItem.name.length === 0 || addItem.price.length === 0 || addItem.category.length === 0) {
      return alert("All fields must be filled up")
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: uuidv4(),
        name: addItem.name,
        price: addItem.price,
        category: addItem.category,
        image: addItem.image,
        desc: addItem.desc

      }
    })
    setAddItem(
      {
        name: "",
        price: "",
        category: "",
        image: "",
        desc: "",
      }
    )
    setToggle(false)
    alert("item added!")
  }

  return (
    <div>
      <div>
        <h1>Add Item</h1>
        <p>name:</p><input type="text" value={addItem.name} name="name" onChange={onChange}></input>
        <p>price:</p><input type="number" value={addItem.price} name="price" onChange={onChange}></input>
        <p>category:</p><input type="text" value={addItem.category} name="category" onChange={onChange}></input>
        <p>image:</p><input type="text" value={addItem.image} name="image" onChange={onChange}></input>
        <p>description:</p><textarea value={addItem.desc} name="description" onChange={onChange}></textarea>
        <br></br>
        <button onClick={handleSubmit}>done</button><button onClick={() => setToggle(false)}>Cancel</button>
      </div>
    </div>

  )
}

export default AddItem