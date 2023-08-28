import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ListItem from '../ListItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_LIST, ADD_MULTIPLE_TO_LIST } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const List = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getList() {
      const list = await idbPromise('list', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_LIST, meals: [...list] });
    }

    if (!state.list.length) {
      getList();
    }
  }, [state.list.length, dispatch]);

  function toggleList() {
    dispatch({ type: TOGGLE_LIST });
  }

  function calculateTotal() {
    let sum = 0;
    state.list.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        meals: [...state.list],
      },
    });
  }

  if (!state.listOpen) {
    return (
      <div className="list-closed" onClick={toggleList}>
        <span role="img" aria-label="trash">
        📝
        </span>
      </div>
    );
  }

  return (
    <div className="list">
      <div className="close" onClick={toggleList}>
        [close]
      </div>
      <h2>Food List</h2>
      {state.list.length ? (
        <div>
          {state.list.map((item) => (
            <ListItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
          👻
          </span>
          Food list is empty!
        </h3>
      )}
    </div>
  );
};

export default List;