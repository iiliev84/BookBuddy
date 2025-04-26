/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link, useNavigate } from "react-router-dom";

 function Navigations({ token, setToken }) {
  const navigate = useNavigate("");

  const handleLogOut = () => {
    setToken(null);
    navigate("/users/login");
  };

  return (
    <nav className="navbar">
      <div className="links">
        {token ? (
          <button onClick={handleLogOut}>Log Out</button>
        ) : (
          <>
            <Link className="link" to="/books">
              Home
            </Link>
            <Link className="link" to="/users/register">
              Register
            </Link>
            <Link className="link" to="/users/login">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigations