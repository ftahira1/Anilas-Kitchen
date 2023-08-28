import MealList from "../components/MealList";
import Menu from "../components/Menu";
import List from "../components/List";

const Home = () => {
  return (
    <div className="container">
      <Menu />
      <MealList />
      <List />
    </div>
  );
};

export default Home;