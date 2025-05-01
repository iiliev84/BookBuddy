/* TODO - add your code to create a functional React component that renders a login form */
import { loginUser } from "../API/index";

import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function LogIn({setToken}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");

        try {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email: email,
                password: password,
                }),
            });
      
            const result = await response.json();                  
            if (!response.ok) {
              throw new Error("Invalid credentials." || result.error);
            }
            setToken(result.token);
            navigate('/books');
          } catch (error) {
            setError(error.message);
          }
        }

        return(
        <>
         <div className="login-container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Email: <input
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                Password: <input
                    name = "password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
        </div>
        </>
        )
}
export default LogIn
