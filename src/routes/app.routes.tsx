import React from "react";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";

import Home from "../pages/Home";

const AppStack = createNativeStackNavigator ();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Login" component={Home} />
    </AppStack.Navigator>
);

export default AppRoutes;