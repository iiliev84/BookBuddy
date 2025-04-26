/* TODO - add your code to create a functional React component that renders a login form */
import { loginUser } from "../API/index";

import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function LogIn({setToken}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const registeredUser = await loginUser(email, password);
        setToken(registeredUser.token);
        setEmail("");
        setPassword("");
    }
    return(
        <>
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
            <br/>
            <label>
                Password: <input
                    name = "password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <br/>
            <button onClick={() => {navigate("/books");}}>LogIn</button>
        </form>
        </>
    )
}
export default LogIn
