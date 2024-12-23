//Arquivo TS da baseUrl api (api NodeJS)

import axios from "axios";

export const api = axios.create({
    // baseURL: ``
    baseURL: 'https://projeto-pizzaria-back-end.vercel.app/'
});
