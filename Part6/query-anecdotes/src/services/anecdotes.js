import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const getAnecdotes = () => {
    const response = axios.get(baseUrl).then(res => res.data);
    return response;
}

const createAnecdote = (anecdote) => {
    const response = axios.post(baseUrl, anecdote);
    return response;
}

const voteAnecdote = (anecdote) => {
    const response = axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data);
    return response;
}

export default {
    getAnecdotes,
    createAnecdote,
    voteAnecdote,
    asObject
}