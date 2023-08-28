import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_MENUES,
  UPDATE_CURRENT_MENU,
} from '../../utils/actions';
import { QUERY_MENUES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Menu() {
  const [state, dispatch] = useStoreContext();

  const { menues } = state;

  const { loading, data: menuData } = useQuery(QUERY_MENUES);

  useEffect(() => {
    if (menuData) {
      dispatch({
        type: UPDATE_MENUES,
        menues: menuData.menues,
      });
      menuData.menues.forEach((menu) => {
        idbPromise('menues', 'put', menu);
      });
    } else if (!loading) {
      idbPromise('menues', 'get').then((menues) => {
        dispatch({
          type: UPDATE_MENUES,
          menues: menues,
        });
      });
    }
  }, [menuData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_MENU,
      currentMenu: id,
    });
  };

  return (
    <div>
      <h2>Menu:</h2>
      {menues.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default Menu;