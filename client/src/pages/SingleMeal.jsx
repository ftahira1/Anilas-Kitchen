import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import List from '../components/List';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_LIST,
  UPDATE_LIST_QUANTITY,
  ADD_TO_LIST,
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

  const { meals, list } = state;

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

  const addToList = () => {
    const itemInList = list.find((listItem) => listItem._id === id);
    if (itemInList) {
      dispatch({
        type: UPDATE_LIST_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInList.purchaseQuantity) + 1,
      });
      idbPromise('list', 'put', {
        ...itemInList,
        purchaseQuantity: parseInt(itemInList.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_LIST,
        meal: { ...currentMeal, purchaseQuantity: 1 },
      });
      idbPromise('list', 'put', { ...currentMeal, purchaseQuantity: 1 });
    }
  };

  const removeFromList = () => {
    dispatch({
      type: REMOVE_FROM_LIST,
      _id: currentMeal._id,
    });

    idbPromise('list', 'delete', { ...currentMeal });
  };

  return (
    <>
      {currentMeal && list ? (
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
            <button onClick={addToList}>Add to List</button>
            <button
              disabled={!list.find((p) => p._id === currentMeal._id)}
              onClick={removeFromList}
            >
              Remove from List
            </button>
          </p>

        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <List />
    </>
  );
}

export default SingleMeal;