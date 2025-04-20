import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const read = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = (newPersonObject) => {
    const request = axios.post(baseURL, newPersonObject);
    return request.then(response => response.data);
}

const update = (newPhoneNumber, id) => {
    const request = axios.put(`${baseURL}/${id}`, newPhoneNumber);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

export default { read, create, update, deletePerson }