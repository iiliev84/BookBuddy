/* TODO - add your code to create a functional React component that renders a registration form */
import {registerUser} from "../API/index"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e){
            e.preventDefault();
            const newUser = await registerUser(firstName, lastName, email, password);
            setToken(newUser.token);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            navigate("LogIn");
        }
        return(
            <>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input 
                    value = {firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label>
                    Last Name: <input 
                    value = {lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)} />
                </label>
                <label>
                    Email: <input 
                    value = {email}
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password: <input 
                    type="password" 
                    value={password} 
                    minLength={6}
                    title="Your password must be at least 6 characters long."
                    required 
                    onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Submit</button>
            </form>
            </>
          );
}

export default Register
