/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSingleBook, getAllBooks } from "../API";

function Books() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState();
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getBooks() {
        const books = await getAllBooks();
        setBooks(books);
      }
      getBooks();
    }, []);
  
    const filteredBooks = search
      ? books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
      : books;
  
    async function handleBookDetails(bookId) {
      const response = await getSingleBook(bookId);
      navigate(`/books/${bookId}`);
    }
  
    return (
      <>
        <div className="search">
        <h4> Search Books By Name {" "}
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
        </h4>
        </div>
        <div className="all-books">
          {filteredBooks.map((book) => {
            return (
              <div key={book.id} className="book">
                <h4>{book.title}</h4>
                <h4>{book.author}</h4>
                <div>
                <h5>Book Status: </h5>
                  {book.available ? 
                    <div className="book-available">Available</div>:
                  book.available === false &&
                    <div className="book-unavailable">Unavailable</div>}
                  {book.available === null && 
                  <div  className="book-unknown">Unknown: please ask!</div>}
                </div>
                <img className="book-image"
                  src={book.coverimage}/>
                <br/>
                <button
                  className="button-details"
                  onClick={() => handleBookDetails(book.id)}
                > Details </button>
                <br/>
                <br/>
              </div>
            );
          })}
        </div>
      </>
    );
  };

export default Books