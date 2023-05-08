import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const createAnecdote = async (content) => {
    const object = asObject(content);
    const response = await axios.post(baseUrl, object)
    return response.data;
}

const voteAnecdote = async (anecdote) => {
    if (anecdote) {
        const changedAnecdote = {
            ...anecdote, votes: anecdote.votes + 1
        };
        const response = await axios.put(baseUrl + '/' + changedAnecdote.id, changedAnecdote);
        return response.data;
    }

}

export default {
    getAll,
    createAnecdote,
    voteAnecdote
}