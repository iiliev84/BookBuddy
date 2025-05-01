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

  return(
    <>
    <div>
     {user ? (
    <>
      <h1>Account Details</h1>
      <h3>Name: {user.firstname} {user.lastname}</h3>
      <p><strong>Login email:</strong> {user.email}</p>
      <h3>Reserved Books</h3>
      {user.reservations && user.reservations.length > 0 ? (
        user.reservations.map((book) => (
          <div key={book.id} className="reservations-container">
                  <p> <strong>Title:</strong> {book.title} </p>
                  <p> <strong>Author:</strong> {book.author} </p>
                  <img src={book.coverimage} className="book-image"/>
                  <br />
                  <button className="button-return"
                    onClick={() => handleReturn(book.id, token)}>
                    Return Book
                  </button>
                  <br />
                  <button className="button-back" onClick={() => navigate("/books")}>
                    Back
                  </button>
                </div>
        ))
      ) : (
        <p>No reserved books</p>
      )}
    </>
  ) : (
    <p>Loading account details...</p>
  )}
</div>
</>
)
}

export default Account