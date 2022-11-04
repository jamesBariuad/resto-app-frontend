import React from 'react'
import styles from "./SortCategory.module.css"

const SortCategory = ({ categories, dispatch }) => {

    const options = categories.map(category => <option value={category} key={category}>{category}</option>)

    const handleOptionChange = (e) => {
        console.log(e.target.value)
        dispatch({
            type: "CATEGORY_SELECTION",
            payload: {
                categorySelected: e.target.value
            }
        });
    }

    return (
        <div className={styles.categoryBox}>
            <b>Sort by Category: </b>
            <select onChange={handleOptionChange}>
                <option value="">all</option>
                {options}
            </select>
        </div>
    )
}

export default SortCategory