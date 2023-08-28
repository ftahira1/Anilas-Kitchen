import { useEffect } from 'react';
import Meal from '../Meal';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MEALS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_MEALS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function MealList() {
  const [state, dispatch] = useStoreContext();

  const { currentMenu } = state;

  const { loading, data } = useQuery(QUERY_MEALS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MEALS,
        meals: data.meals,
      });
      data.meals.forEach((meal) => {
        idbPromise('meals', 'put', meal);
      });
    } else if (!loading) {
      idbPromise('meals', 'get').then((meals) => {
        dispatch({
          type: UPDATE_MEALS,
          meals: meals,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterMeals() {
    if (!currentMenu) {
      return state.meals;
    }

    return state.meals.filter(
      (meal) => meal.menu._id === currentMenu
    );
  }

  return (
    <div className="my-2">
      <h2>Meals:</h2>
      {state.meals.length ? (
        <div className="flex-row">
          {filterMeals().map((meal) => (
            <Meal
              key={meal._id}
              _id={meal._id}
              image={meal.image}
              name={meal.name}
              price={meal.price}
              quantity={meal.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any meals yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default MealList;