/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { fetchAccountDetails } from '../API/index'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Account( {token} ) {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate('/users/login');
        return;
      }
      const result = await fetchAccountDetails(token);
      setAuth(result);
      setError(error.message);
    }
    if (token) {
        fetchUser();
      }
  }, [token]);

  return (
    <>
      <h2>Account Information:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {auth ? (
        <div>
          <h3>Email: {auth.email}</h3>
          <h3>Token: {token}</h3>
        </div>
      ) : (
        <h2>Please Register and Log In</h2>
      )}
    </>
  );
}

export default Account