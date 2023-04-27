import axios from 'axios';

// console.log(process.env.REACT_APP_BASE_URL);

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // chạy biến môi trường trong file .env
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data; //  dùng để default res.data ở bên ô search(index.js)
};

export default httpRequest;
