import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_MEALS,
} from '../utils/actions';
import { QUERY_MEALS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function SingleMeal() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentMeal, setCurrentMeal] = useState({});

  const { loading, data } = useQuery(QUERY_MEALS);

  const { meals, cart } = state;

  useEffect(() => {
    // already in global store
    if (meals.length) {
      setCurrentMeal(meals.find((meal) => meal._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_MEALS,
        meals: data.meals,
      });

      data.meals.forEach((meal) => {
        idbPromise('meals', 'put', meal);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('meals', 'get').then((indexedMeals) => {
        dispatch({
          type: UPDATE_MEALS,
          meals: indexedMeals,
        });
      });
    }
  }, [meals, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        meal: { ...currentMeal, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentMeal, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentMeal._id,
    });

    idbPromise('cart', 'delete', { ...currentMeal });
  };

  return (
    <>
      {currentMeal && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Menu</Link>

          <h2>{currentMeal.name}</h2>
          <img className='singlePhoto'
            src={`/images/${currentMeal.image}`}
            alt={currentMeal.name}
          />

          <p>{currentMeal.description}</p>

          <p>
            <strong>Price:</strong>${currentMeal.price}{' '}
            <button onClick={addToCart}>Add to List</button>
            <button
              disabled={!cart.find((p) => p._id === currentMeal._id)}
              onClick={removeFromCart}
            >
              Remove from List
            </button>
          </p>

        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default SingleMeal;