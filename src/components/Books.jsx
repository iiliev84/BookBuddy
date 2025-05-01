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
        const result = await getAllBooks();
        setBooks(result);
      }
      getBooks();
    }, []);
  
    const filteredBooks = search
      ? books.filter((book) => book.author.toLowerCase().includes(search.toLowerCase()) || 
        book.title.toLowerCase().includes(search.toLowerCase()))
      : books;
  
    async function handleBookDetails(bookId) {
      const response = await getSingleBook(bookId);
      navigate(`/books/${bookId}`);
    }
  
    return (
      <>
        <div className="search">
        <h4> Search Books {" "}
            <input
              type="text"
              placeholder="Search by author or title"
              onChange={(e) => setSearch(e.target.value)}
            />
        </h4>
        </div>
        <div className="books-container">
          {filteredBooks.map((book) => {
            return (
              <div key={book.id} className="all-books">
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
                >Book Details </button>
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