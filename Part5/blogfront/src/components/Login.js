const Login = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={props.username} onChange={props.handleUserChange} placeholder="Jhon..." />
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={props.password} onChange={props.handlePasswordChange} placeholder="*********" />
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

export default Login;