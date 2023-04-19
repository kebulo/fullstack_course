import axios from "axios";
const baseUrl = 'http://localhost:3001/api/login/';

const login = async (params) => {
    let response = await axios.post(baseUrl, params);
    return response.data;
}

export default {
    login
}