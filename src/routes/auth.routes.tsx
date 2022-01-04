import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const AuthStack = createNativeStackNavigator ();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
);



export default AuthRoutes;