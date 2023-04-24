import axios from 'axios';
//import baseUrl from '/api/blogs';
const baseUrl = 'http://localhost:3001/api/blogs/';
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const create = async (data) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, data, config);
    return response.data;
}

const update = async (id, data) => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.put(baseUrl + id, data, config);
    return response.data;
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.delete(baseUrl + id, config);
    return response.data;
}

export default {
    setToken,
    getAll,
    create,
    update,
    remove
}