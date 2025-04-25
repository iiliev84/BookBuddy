const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

// Register
export async function registerUser(firstName, lastName, email, password) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
        console.error(error);
    }
  }

// Login
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        }),
    });
    const result = response.json();
    return result;
    } catch (error) {
        console.error(error);
    }
}

// Get your account details
export async function fetchAccountDetails(token) {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const result = await response.json();
        return result;
        } catch (error) {
            console.error(error);
    }
}

// Get all books
export async function fetchAllBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        const result = await response.json();
        return result.books;
        } catch (error) {
        console.error(error);
        }
  } 

// Get book details
export async function fetchSingleBook(bookId) {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`);
        const result = await response.json();  
        return result.book;
        } catch (error) {
        console.error(error);
        }
}

// Get your reservations
export async function fetchReservations(token) {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
      });
      const result = await response.json();
      return result.reservation;
    } catch (error) {
      console.error(error);
    }
}

// Reserve a book

// Return a book