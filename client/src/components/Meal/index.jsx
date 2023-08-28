import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_LIST, UPDATE_LIST_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ListItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { list } = state

  const addToList = () => {
    const itemInList = cart.find((listItem) => listItem._id === _id)
    if (itemInList) {
      dispatch({
        type: UPDATE_LIST_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInList.purchaseQuantity) + 1
      });
      idbPromise('list', 'put', {
        ...itemInList,
        purchaseQuantity: parseInt(itemInList.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_LIST,
        meal: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('list', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/meals/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("piece", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToList}>Add to list</button>
    </div>
  );
}

export default ListItem;