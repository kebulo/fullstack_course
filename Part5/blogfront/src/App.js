import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import loginService from './services/login';

import './App.css';

function App() {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState({});

	useEffect(() => {
		let response = blogService.getAll();
		setBlogs(response);
	}, []);

	const login = async (e) => {
		e.preventDefault();

		let loginData = {
			username: username,
			password: password
		};

		const response = await loginService.login(loginData);
		console.log(response);

		if (response.data) {
			setUser(response.data);
		}
	}

	if (blogs.length > 0) {
		return (
			<div className="App">
				<h2>Blogs Application</h2>
				{
					blogs.map(blog => {
						<Blog key={blog.id} blog={blog} />
					})
				}
			</div>
		);
	}

	return (
		<div className="App">
			<h2>Blogs Application</h2>
			<Login
				handleSubmit={login}
				username={username} handleUserChange={e => setUsername(e.target.value)}
				password={password} handlePasswordChange={e => setPassword(e.target.value)} />
		</div>
	);

}

export default App;
