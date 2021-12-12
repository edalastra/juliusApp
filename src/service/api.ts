import axios from 'axios';

interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

const api = axios.create({
    //baseURL: 'http://10.0.2.2:3000/api', 
    baseURL: '
    
      http://d3ad-201-159-87-161.ngrok.io/api', 

    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

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

interface BudgetItem {
    type: string;
    amount: number;
    description: string;
    month: number;
}

export function getBudgetsItem() {
    return new Promise((resolve) => {
       api.get('/budgetitems').then(response => {;
        resolve(response.data);
        })
        .catch(err => {
            console.log(err.response.status)
            throw err;
        })
    });
}

export const registerInfoBudget = (data: BudgetItem): Promise<Response> => {
    return new Promise((resolve) => {
        api.post('/budgetitems', data).then(response => {
            resolve(response.data);
        })
        .catch(err => {
            console.log(err.response.data)
            throw err;
        });
    });
}
