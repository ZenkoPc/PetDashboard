import axios from "axios";

export const petAdmin = axios.create({
    baseURL: 'http://localhost:3030/auth',
    headers: {
        "Content-Type": "application/json"
    }
})

export const petAdminPetsInfo = axios.create({
    baseURL: 'http://localhost:3030/pets',
    headers: {
        "Content-Type": "application/json"
    }
})