import axios from "axios";

export const baseURL = 'http://localhost:8081/'

export const userLogin = async (obj) => {
    try {
        console.log("obj", obj);
        const response = await axios.post(`${baseURL}user/login`, obj);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const register = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}user/registration`, obj);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createCategory = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}categories/new`, obj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryList = async () => {
    try {
        const response = await axios.get(`${baseURL}categories`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}product/new`, obj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}