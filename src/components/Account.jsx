import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountDetails, returnBook } from '../API/index.js';

function Account({ token }) {
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

  const handleReturn = async (bookId, token) => {
    try {
      await returnBook(bookId, token);
      const response = await getAccountDetails(token);
      setUser(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {user && (
        <div key={user.id} className="account-container">
           <h1>Account Details</h1>
           <h2> Hello {user.firstname} {user.lastname}</h2>
           <p><strong>Login email:</strong> {user.email}</p>
          {!token ? (
            <div>
              <h2>No Reserved Books</h2>
            </div>
          ) : (
            <div>
              <h2>Reserved Books</h2>
              {user.reservations.map((book) => (
                <div key={book.id} className="reservations-container">
                  <p> <strong>Title:</strong> {book.title} </p>
                  <p> <strong>Author:</strong> {book.author} </p>
                  <img src={book.coverimage} className="book-image"/>
                  <br />
                  <button className="button-return"
                    onClick={() => handleReturn(book.id, token)}>
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => navigate("/")} className="button-back">
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default Account