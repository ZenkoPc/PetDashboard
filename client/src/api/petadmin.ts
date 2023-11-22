import axios from "axios";

export const petAdmin = axios.create({
    baseURL: 'http://localhost:3030/auth',
    headers: {
        "Content-Type": "application/json"
    }
})