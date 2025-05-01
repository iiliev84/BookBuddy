/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link } from "react-router-dom";

 function Navigations({ token, setToken }) {
    
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
      };
      
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to='/books'>Home</Link>
        {token ? (
          <>
            <Link to='/account'>Account</Link>
            <button onClick={handleLogout} >Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigations