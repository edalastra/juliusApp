import axios from 'axios';

interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/api'
});

export function signIn(email : string, password: string): Promise<Response> {
    return new Promise(async (resolve) => {
        const response = await api.post('/authenticate', {
            email,
            password
        }).then(response => resolve(response.data))
        .catch(error => {
                throw new Error('Usuário ou senha inválidos');
            
        })
    });
};

export function signUp(name: string, email: string, password: string): Promise<Response> {
    return new Promise(async (resolve) => {
        const response = await api.post('/register', {
            name,
            email,
            password
        }).then(response => {
            resolve(response.data);
        })
        .catch(err => {
            console.log(err.response.status)
            throw err;
        });
    })
};