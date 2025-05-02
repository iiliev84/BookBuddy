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
        <Link className="nav-link" to='/books' >Home</Link>
        {token ? (
          <>
            <Link className="nav-link" to='/account'>Account</Link>
            <button className="logout-button" onClick={handleLogout} >Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to='/login'>Login</Link>
            <Link className="nav-link" to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigations