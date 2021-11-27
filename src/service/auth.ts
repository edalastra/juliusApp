interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'fake-jwt-token',
                user: {
                    name: 'Fake User',
                    email: 'fakemail@gmail.com',
                }
            });
        }, 1000);
    });
}