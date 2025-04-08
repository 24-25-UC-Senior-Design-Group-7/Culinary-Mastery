import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
    withCredentials: true  // Ensure credentials are sent with each request
});

// You can add interceptors for requests and responses
instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return Promise.reject(error);
    }
);

export default instance;
