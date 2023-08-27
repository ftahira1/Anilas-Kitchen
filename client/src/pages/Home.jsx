import MealList from "../components/MealList";
import Menu from "../components/Menu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <Menu />
      <MealList />
      <Cart />
    </div>
  );
};

export default Home;