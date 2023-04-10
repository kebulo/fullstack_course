import axios from 'axios';
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return formatResponse(request);
};

const create = (data) => {
    return axios.post(baseUrl, data);
};

const update = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data);
};

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    console.log(request, 'Rquest log');
    return formatResponse(request);
};

const formatResponse = (request) => {
    return request.then(response => response.data)
}

export default {getAll, create, update, deleteNumber};