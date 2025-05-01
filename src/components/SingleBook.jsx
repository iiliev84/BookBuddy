/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBook, reserveBook } from "../API";

function SingleBook({token}) {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    async function getBook() {
      const result = await getSingleBook(id);
      setBook(result);
    }
    getBook();
  }, []);

  const handleReserve = async (bookId) => {
    try {
      const result = await reserveBook(bookId, token);
      setReservation(result);
      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {book && (
        <div key={book.id} className="single-book">
          <p> <strong>Title:</strong> {book.title} </p>
          <p> <strong>Author:</strong> {book.author} </p>
          <p> <strong>Description:</strong> {book.description} </p>
        <div>
        <p> <strong>Book Status:</strong> </p>
          {book.available ? 
            <div className="book-available">Available</div>:
            book.available === false &&
            <div className="book-unavailable">Unavailable</div>}
            {book.available === null && 
            <div  className="book-unknown">Unknown: please ask!</div>}
        </div>
            <img className="book-image"
             src={book.coverimage}/>
          <br />
          {token && (
            <button onClick={() => handleReserve(book.id)} className="button-checkout">
              Reserve Book
            </button>
          )}
        </div>
      )}
      <button className="button-back" onClick={() => navigate("/books")}>
        Back
      </button>
    </div>
  );
};

export default SingleBook;