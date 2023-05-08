import { useEffect } from 'react';
import AnecdotesList from './components/AnecdotesList';
import CreateAnecdote from './components/CreateAnecdote';
import Filters from './components/Filters';
import Notifications from './components/Notifications';

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, [dispatch]);

	return (
		<div>
			<Filters />
			<Notifications />
			<AnecdotesList />
			<CreateAnecdote />
		</div>
	)
}

export default App;