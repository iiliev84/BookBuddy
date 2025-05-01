/* TODO - add your code to create a functional React component that renders a registration form */
import {registerUser} from "../API/index"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        

        try {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
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
            if (response.ok) {
              navigate('/login');
            } else {
              setError("Failed to register" || result.error);
            }
          } catch (error) {
            console.error(error);
            setError(error.message);
          }
        }     
        
        return(
            <>
            <div className="register-container">
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input 
                    value = {firstname}
                    required
                    onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br/><br/>
                <label>
                    Last Name: <input 
                    value = {lastname}
                    required
                    onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br/><br/>
                <label>
                    Email: <input 
                    value = {email}
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br/><br/>
                <label>
                    Password: <input 
                    type="password" 
                    value={password} 
                    minLength={5}
                    title="Your password must be at least 5 characters long."
                    required 
                    onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br/><br/>
                <button>Submit</button>
                <p><button><Link to="/login">Login</Link> </button> if you have an account.</p>
            </form>
            </div>
            </>
          );
}

export default Register
