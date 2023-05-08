import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const anecdotesTemp = [...state.anecdotes];

        if (state.filter === 'ALL') {
            return anecdotesTemp.sort((a, b) => b.votes - a.votes);
        }

        return anecdotesTemp.filter(anecdote => anecdote.content.includes(state.filter));
    });

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
    }

    return (
        <>
            <h2>Anecdotes</h2>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AnecdoteList;