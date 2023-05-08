import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useReducer } from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import anecdoteService from './services/anecdotes';
import AnecdoteContext from './AnecdoteContext';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.payload;
		case "RESTART_NOTIFICATION":
			return '';
		default:
			return state;
	}
}

const App = () => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '');

	const queryClient = useQueryClient();
	const updateAnecdoteMutation = useMutation(anecdoteService.voteAnecdote);

	const handleVote = (anecdote) => {
		const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

		updateAnecdoteMutation.mutate(updatedAnecdote, {
			onSuccess: () => {
				queryClient.invalidateQueries('anecdotes')
			}
		})
	}

	const result = useQuery(
		'anecdotes',
		() => anecdoteService.getAnecdotes()
	);

	if (result.isLoading) {
		return <div>Loading data...</div>;
	}

	if (result.isError) {
		return <p>Anecdote service not available due to problems in the server</p>;
	}

	const anecdotes = result.data;

	return (
		<AnecdoteContext.Provider value={[notification, notificationDispatch]}>
			<div>
				<h3>Anecdote app</h3>

				<Notification />
				<AnecdoteForm />

				{anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
					</div>
				)}
			</div>
		</AnecdoteContext.Provider>
	)
}

export default App
