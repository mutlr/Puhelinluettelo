import axios from 'axios';
const url = '/api/persons';

const create = (newPerson) => {
    return axios.post(url, newPerson);
}

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response);
}

const replaceExisting = (changedNumber) => {
    return axios
    .put(`${url}/${changedNumber.id}`, changedNumber)
    .then(response => response.data);
}
const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`);
}

export default {create, getAll, deletePerson, replaceExisting};