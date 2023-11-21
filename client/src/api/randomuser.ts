import axios from "axios";

export const randomUser = axios.create({
    baseURL: 'https://randomuser.me/api'
})