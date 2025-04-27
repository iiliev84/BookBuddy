import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountDetails } from '../API/index.js';

export default function Account({ token }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function getUser() {
      try {
        const result = await getAccountDetails(token);
        setUser(result);
      } catch (error) {
        console.error("Error loading user details: ", error);
      }
    }
    getUser();
  }, [token, navigate]);

  return (
    <div className="account-container">
      <h1>Account Details</h1>

      <div className="account-details">
        {user ? (
          <>
            <h2> Hello {user.firstname} {user.lastname}</h2>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Loading account details...</p>
        )}
      </div>    
    </div>
  ); 
}