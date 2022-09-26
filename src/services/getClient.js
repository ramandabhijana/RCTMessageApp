import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getClient = axios.create({
    baseURL: "http://52.193.52.243/app/api"
});

getClient.interceptors.request.use(
    async (config) => {
        config.headers.Accept = "application/json"
        return config;
    }, 
    (err) => {
        return Promise.reject(err);
    }
);

export default getClient;
