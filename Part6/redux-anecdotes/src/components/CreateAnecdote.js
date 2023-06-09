import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const CreateAnecdote = () => {
    const dispatch = useDispatch();

    const handleCreateAnecdote = (event) => {
        event.preventDefault();
		let content = event.target.content.value;
        dispatch(createAnecdote(content));
        dispatch(setMessage("The notification was created successfully"));
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleCreateAnecdote}>
                <div><input name='content' /></div>
                <button>create</button>
            </form>
        </>

    );
}

export default CreateAnecdote;