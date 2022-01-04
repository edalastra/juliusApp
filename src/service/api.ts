import axios from 'axios';
import { exp } from 'react-native-reanimated';

interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

const api = axios.create({
    //baseURL: 'https://juliusappbackend.herokuapp.com/api', 
    baseURL: 'http://10.0.2.2:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

export function signIn(email : string, password: string): Promise<Response> {
    return new Promise(async (resolve) => {
        await api.post('/authenticate', {
            email,
            password
        }).then(response => resolve(response.data))
        .catch(error => {
            if (error.response.status == 401) {
                alert('Usuário ou senha inválidos');            
            }
            if( error.response.status == 500) {
                alert('Erro no servidor');
            }
        })
    });
};

export function signUp(name: string, email: string, password: string): Promise<Response> {
    return new Promise(async (resolve) => {
       api.post('/register', {
            name,
            email,
            password
        }).then(response => {
            resolve(response.data);
        })
        .catch(error => {
            if(error.response.status == 400) {
                alert('Este email já é cadastrado');  
            } else {
                alert('Erro no servidor');
            }
        });
    })
};

export function updateUser(name: string, email: string): Promise<Response> {
    return new Promise(async (resolve) => {
        api.put('/user', {
            name,
            email
        }).then(response => {
            resolve(response.data);
        })
        .catch(error => {
            if(error.response.status == 400) {
                alert('Este email já é cadastrado');  
            } else {
                alert('Erro no servidor');
            }
        });
    })
};

export function changePassword(newPassword: string, oldPassword: string): Promise<Response> {
    return new Promise(async (resolve) => {
        api.put('/user/password', {
            newPassword,
            oldPassword
        }).then(response => {
            resolve(response.data);
        })
        .catch(error => {
            if(error.response.status == 401) {
                alert('Senha atual incorreta');  
            } else {
                alert('Erro no servidor');
            }
        });
    })
};

interface BudgetItem {
    type: string;
    amount: number;
    description: string;
    month: number;
    year: number;
}

export function getBudgetsItem(month: number, year: number) {
    return new Promise((resolve) => {
       api.get(`/budgetitems/${year}/${month}`).then(response => {;
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

            throw err;
        });
    });
}

export const getBudgets = (): Promise<Response> => {
    return new Promise((resolve) => {
        api.get('/budgets').then(response => {
            resolve(response.data);
        })
        .catch(err => {
            throw err;
        });
    });
};

export const getMonths = (): Promise<Response> => {
    return new Promise((resolve) => {
        api.get('/getMonths').then(response => {
            resolve(response.data);
        })
        .catch(err => {
            console.log(err.response.data)
            throw err;
        });
    });
};