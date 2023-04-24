import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import AlertMessage from './components/AlertMessage';
import Blog from './components/Blog';
import Login from './components/Login';
import CreateBlog from './components/CreateBlog';
import Toggable from './components/Togglable';

import './App.css';

function App() {
	const [blogs, setBlogs] = useState([]);	
	const [user, setUser] = useState(null);
	const [messageData, setMessageData] = useState({message: null, classTypeName: ''});

	useEffect(() => {
		blogService.getAll().then((response) => {
			setBlogs(response);
		});
	}, []);

	const login = async (loginData) => {
		let response = await loginService.login(loginData);

		if (response) {
			blogService.setToken(response.token);
			setUser(response);
			setMessageData({message: 'Login successfully', classTypeName: 'success'});
		}
	}

	const createBlog = (blogData) => {
		blogData.user_id = user.id;

		blogService.create(blogData).then((response) => {
			if (response) {
				setBlogs([...blogs, response]);
				setMessageData({message: 'Blog created successfully', classTypeName: 'success'});
			}
		});
	}

	const updateBlog = (blog) => {
		let blogData = {
            author: blog.author,
            likes: blog.likes + 1,
            title: blog.title,
            url: blog.url,
            user_id: user.id
        };

		blogService.update(blog.id, blogData).then((response) => {
			console.log(response);
			if (response) {
				setMessageData({message: 'Like saved', classTypeName: 'success'});
			}
		});
	}

	const deleteBlog = (id) => {
		if (window.confirm('Are you sure you want to delete this blog?')) {
			blogService.remove(id).then((response) => {
				if (response) {
					setMessageData({message: 'Blog deleted successfully', classTypeName: 'success'});
				}
			});
		}
	}

	if (user) {
		return (
			<div className="App">
				<h2>Blogs Application</h2>
				<AlertMessage classTypeName={messageData.classTypeName} message={messageData.message} />
				{
					(blogs.length > 0)
						?
						blogs.map(blog => (
							<Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userId={user.id} />
						))
						: <p>There are no blogs registered</p>
				}
				<Toggable buttonLabel="Create blog">
					<CreateBlog
						createBlog={createBlog} />
				</Toggable>
			</div>
		);
	}

	return (
		<div className="App">
			<h2>Blogs Application</h2>
			<AlertMessage classTypeName={messageData.classTypeName} message={messageData.message} />
			<Toggable buttonLabel="Login">
				<Login handleLogin={login} />
			</Toggable>
		</div>
	);
}

export default App;
