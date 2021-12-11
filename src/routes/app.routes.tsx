import React, { useContext } from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerItems from "../constrants/DrawerItems";
import { colors } from "../components/GlobalComponents/styles";

import Home from "../pages/Home";
import HeaderComponent from "../components/Header";



const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const AppRoutes: React.FC = () => (
    <>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.primary} translucent={false} />
        <Drawer.Navigator initialRouteName="Home"
       
        screenOptions={{
            headerShown: true,
            header: ({ scene, previous, navigation }) => <HeaderComponent scene={scene} previous={previous} navigation={navigation} />,
          }}>
        {
          DrawerItems.map(drawer=><Drawer.Screen 
            key={drawer.name}
            name={drawer.name} 
            options={{
                drawerActiveTintColor: '#000',

                drawerIcon: () => <FontAwesome size={24}  name={drawer.iconName} />
            }}
            component={
                drawer.component
            } 
          />)
        }
        </Drawer.Navigator>
    </>
);

export default AppRoutes;