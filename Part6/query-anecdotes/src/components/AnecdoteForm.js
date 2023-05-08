import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import anecdoteService from '../services/anecdotes';
import AnecdoteContext from '../AnecdoteContext';

const AnecdoteForm = () => {
	const [notification, dispatch] = useContext(AnecdoteContext);
	const queryClient = useQueryClient();
	const newAnecdoteMutation = useMutation(anecdoteService.createAnecdote);

	const newAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;

		if (content.length >= 5) {
			event.target.anecdote.value = '';

			const anecdote = anecdoteService.asObject(content);
			newAnecdoteMutation.mutate(anecdote, {
				onSuccess: () => {
					queryClient.invalidateQueries('anecdotes');
					setNotification("The anecdote was created successfully");
				},
			});

		} else {
			setNotification("The anecdote length must be at least 5 characters long");
		}
	}

	const setNotification = (text) => {
		dispatch({type: 'SET_NOTIFICATION', payload: text});

		setTimeout(() => {
			dispatch({type: 'RESTART_NOTIFICATION'});
		}, 5000);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={newAnecdote}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
