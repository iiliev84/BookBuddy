/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBook } from "../API";

function SingleBook() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    async function getBook() {
      const result = await getSingleBook(id);
      setBook(result);
    }
    getBook();
  }, []);

  return (
    <>
      {book && (
        <div key={book.id} className="singleBook">
          <p> <strong>Title:</strong> {book.title} </p>
          <p> <strong>Author:</strong> {book.author} </p>
          <p> <strong>Description:</strong> {book.description} </p>
        <div>
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
        </div>
      )}
      <button className="button-back" onClick={() => navigate("/")}>
        Back
      </button>
    </>
  );
};

export default SingleBook;