const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

// Register
export async function registerUser(firstname, lastname, email, password) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
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
export async function getAccountDetails(token) {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            method: "GET",
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
export async function getAllBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        const result = await response.json();
        return result;
        } catch (error) {
        console.error(error);
        }
  } 

// Get book details
export async function getSingleBook(bookId) {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`);
        const result = await response.json();  
        return result;
        } catch (error) {
        console.error(error);
        }
}

// Get your reservations
export async function getReservations(token) {
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
export async function reserveBook (bookId, token) {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

// Return a book
export async function returnBook (bookId, token) {
  try {
    const response = await fetch(`${API_URL}/reservations/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });
  } catch (err) {
    console.error(`Whoops, trouble returning book #${bookId}!`, err);
  }
};