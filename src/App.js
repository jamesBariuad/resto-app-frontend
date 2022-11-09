import "./App.css";
import ModifyItems from "./components/ModifyItems";
import AddItem from "./components/AddItem";
import { useReducer, useState, useEffect } from "react";
import Cart from "./components/Cart";
import SortCategory from "./components/SortCategory";
import styles from "./App.module.css";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import Menu from "./components/Menu";
import ItemDetails from "./components/ItemDetails";
import axios from "axios";
import LoadingDisplay from "./components/LoadingDisplay";

function App() {
  const initialState = {
    forSaleItems: [],
    cartItems: [],
    categorySelected: "",
    toggle: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        axios
          .post("https://miniresto-api.onrender.com/forSaleItems", action.payload)
          .then((response) => {
            // console.log(response)
          });
        return {
          ...state,
          forSaleItems: [...state.forSaleItems, action.payload],
        };
      case "EDIT_ITEM":
        axios
          .put(
            `https://miniresto-api.onrender.com/forSaleItems/${action.payload.id}`,
            action.payload
          )
          .then((response) => {
            console.log(response);
          });

        axios
          .put(
            `https://miniresto-api.onrender.com/cartItems/${action.payload.id}`,
            action.payload
          )
          .then((response) => {
            console.log(response);
          });

        return {
          ...state,
          forSaleItems: state.forSaleItems.map((item) => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
              item.price = action.payload.price;
              item.category = action.payload.category;
              item.image = action.payload.image;
              item.desc = action.payload.desc;
            }
            return item;
          }),
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
              item.price = action.payload.price;
              item.category = action.payload.category;
              item.image = action.payload.image;
              item.desc = action.payload.desc;
            }
            return item;
          }),
        };
      case "DELETE_ITEM":
        axios
          .delete(`https://miniresto-api.onrender.com/forSaleItems/${action.payload.id}`)
          .then((response) => {});
        return {
          ...state,
          forSaleItems: state.forSaleItems.filter(
            (item) => item.id !== action.payload.id
          ),
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      case "ADD_TO_CART":
        console.log(action.payload);
        axios
          .post("https://miniresto-api.onrender.com/cartItems", action.payload)
          .then((response) => {});
        return {
          ...state,
          cartItems: action.payload,
        };
      case "DELETE_CART_ITEM":
        axios
          .delete(`https://miniresto-api.onrender.com/cartItems/${action.payload.id}`)
          .then((response) => {});
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      case "DECREMENT":
        axios
          .put(
            `https://miniresto-api.onrender.com/cartItems/decrementItem/${action.payload.id}`
          )
          .then((response) => {});
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item.quantity = item.quantity - 1;
            }
            return item;
          }),
        };
      case "INCREMENT":
        axios
          .put(
            `https://miniresto-api.onrender.com/cartItems/incrementItem/${action.payload.id}`
          )
          .then((response) => {});
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item.quantity = item.quantity + 1;
            }
            return item;
          }),
        };
      case "CATEGORY_SELECTION":
        return {
          ...state,
          categorySelected: action.payload.categorySelected,
        };
      //toggles add item button in modify items tab
      case "TOGGLE":
        return {
          ...state,
          toggle: action.payload.toggle,
        };
      case "LOAD_FROM_JSON":
        return {
          ...state,
          forSaleItems: action.payload,
        };
      case "LOAD_CART_FROM_JSON":
        return {
          ...state,
          cartItems: action.payload,
        };

      default: {
        return alert("there is something wong");
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddToCartClick = (id, counter) => {
    const cartCopy = [...state.cartItems];

    let exists = false;

    cartCopy.forEach((item) => {
      if (id === item.id) {
        item.quantity = item.quantity + counter;
        exists = true;
      }
    });

    if (exists === false) {
      let newItem = state.forSaleItems.filter((item) => item.id === id);

      newItem = Object.assign({}, ...newItem);

      const item = {
        ...newItem,
        quantity: counter,
      };

      cartCopy.push(item);
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: cartCopy,
    });
    alert("added to cart successfully!");
  };

  //get items from server and load it on frontend every time a change is done
  useEffect(() => {
    axios.get("https://miniresto-api.onrender.com/forSaleItems").then((response) => {
      dispatch({
        type: "LOAD_FROM_JSON",
        payload: response.data,
      });
    });

    axios.get("https://miniresto-api.onrender.com/cartItems").then((response) => {
      dispatch({
        type: "LOAD_CART_FROM_JSON",
        payload: response.data,
      });
    });
  }, []);

  const categories = state.forSaleItems.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  //Gets the total items in cart
  let cartTotal = 0;
  const calculateTotal = () => {
    state.cartItems.forEach((item) => {
      cartTotal += item.quantity * item.price;
    });
    return cartTotal;
  };
  calculateTotal();

  //filters items based on the category selected
  let filteredItems =
    state.categorySelected === "" || undefined
      ? state.forSaleItems
      : state.forSaleItems.filter(
          (item) => item.category === state.categorySelected
        );

  //displays the different tabs(menu,cart,modify items)
  const displayModify = filteredItems.map((item) => (
    <ModifyItems
      key={item.id}
      item={item}
      dispatch={dispatch}
      handleAddToCartClick={handleAddToCartClick}
    />
  ));
  const displayMenu = filteredItems.map((item) => (
    <Menu
      key={item.id}
      item={item}
      handleAddToCartClick={handleAddToCartClick}
      dispatch={dispatch}
    />
  ));
  const displayCart = state.cartItems.map((item) => (
    <Cart item={item} key={item.id} dispatch={dispatch} cartTotal={cartTotal} />
  ));

  const [toggle, setToggle] = useState(false);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <img src={banner} alt="banner" className={styles.img}/> */}
          <strong>Resto App</strong>
        </div>
        <nav>
          <Link to="/" className={styles.tab1}>
            Menu
          </Link>
          <Link to="/cart" className={styles.tab2}>
            Cart
          </Link>
          <Link to="/modifyitems" className={styles.tab3}>
            Modify Items
          </Link>
          
        </nav>
        <div className={styles.main}>
          <Routes>
            (
            <Route
              path="/"
              element={
                state.forSaleItems.length === 0 ? (
                  <LoadingDisplay/>
                ) : (
                  <>
                    <div className={styles.category}>
                      <SortCategory
                        categories={categories}
                        dispatch={dispatch}
                      />
                    </div>
                    <div className={styles.menu}>{displayMenu}</div>
                  </>
                )
              }
            />
            )
            <Route
              path="/item/:id"
              element={
                <ItemDetails
                  forSaleItems={state.forSaleItems}
                  cartItems={state.cartItems}
                  handleAddToCartClick={handleAddToCartClick}
                />
              }
            />
            <Route
              path="cart"
              element={
                state.cartItems.length === 0 ? (
                  // <div className={styles.cart}>
                  //   <strong>no items add to cart now</strong>
                  // </div>
                  <LoadingDisplay/>
                ) : (
                  <>
                    <div className={styles.cart}>
                      {displayCart}
                      <div className={styles.grandTotal}>
                        <b>Total : </b>₱ {cartTotal}
                      </div>
                    </div>
                  </>
                )
              }
            />
            <Route
              path="/modifyitems"
              element={
                <div className={styles.modifyItems}>
                  {toggle ? (
                    <AddItem
                      dispatch={dispatch}
                      forSaleItems={state.forSaleItems}
                      setToggle={setToggle}
                    />
                  ) : (
                    <button onClick={() => setToggle(true)}>Add an Item</button>
                  )}
                  <div className={styles.displayModify}>{displayModify}</div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
