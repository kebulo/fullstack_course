import axios from 'axios';
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return formatResponse(request);
};

const create = (data) => {
    const request = axios.post(baseUrl, data);
    return formatResponse(request);
};

const update = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data);
};

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return formatResponse(request);
};

const formatResponse = (request) => {
    return request.then(response => response.data)
}

export default {getAll, create, update, deletePerson};