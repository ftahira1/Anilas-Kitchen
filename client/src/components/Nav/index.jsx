import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/maps2">
              About us!
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/orderStory">
              Order Story
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
        <li className="mx-1">
            <Link to="/maps2">
              About us!
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              SignUp!
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              LogIn!
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">👩‍🍳 </span>
          Anilas Kitchen
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;