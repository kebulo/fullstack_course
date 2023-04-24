import { useState } from "react";

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();

        handleLogin({
            username: username,
            password: password
        })
    }

    return (
        <form onSubmit={login}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Jhon..." />
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="*********" />
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

export default Login;