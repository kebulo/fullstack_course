import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload;
        },
        setAnecdote(state, action) {
            const anecdoteData = action.payload;
            return [...state, anecdoteData];
        },
        setVoteAnecdote(state, action) {
            const id = action.payload;

            const anecdoteToChange = state.find(a => a.id === id);

            const changedAnecdote = {
                ...anecdoteToChange, votes: anecdoteToChange.votes + 1
            };

            return state.map(anecdote => (id === anecdote.id)
                ? changedAnecdote
                : anecdote);
        }
    }
});

export const { setAnecdotes, setAnecdote, setVoteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdote = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdote));
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.createAnecdote(content);
        dispatch(setAnecdote(anecdote));
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const anecdoteResp = await anecdoteService.voteAnecdote(anecdote);
        dispatch(setVoteAnecdote(anecdote.id));
    }
}

export default anecdoteSlice.reducer;