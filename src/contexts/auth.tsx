import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from "../service/api"
import api from "../service/api";

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(email : string, password : string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
    
export const AuthProvider: React.FC = ({ children }) => { 
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
            api.defaults.headers.common['authorization'] = `Bearer ${storagedToken}`;

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);

        };
        loadStoragedData();
    }, []);

    async function signIn(email : string, password : string) {
            const response = await auth.signIn(email, password);
            const { token, user } = response;
            setUser(user);

            api.defaults.headers.common['authorization'] = `Bearer ${token}`;

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user));
            await AsyncStorage.setItem('@RNAuth:token', token);
    }    

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user: user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;