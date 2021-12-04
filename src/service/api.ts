import axios from 'axios';

interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export function signIn(email : string, password: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
    try{
        const response = await api.post('/sessions', {
            email,
            password
        });
        resolve(response.data);
    } catch(err) {
        reject(err);
    }});
};

export function signUp(name: string, email: string, password: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
    try{
        const response = await api.post('/users', {
            name,
            email,
            password
        });
        resolve(response.data);
    } catch(err) {
        reject(err);
    }});
}