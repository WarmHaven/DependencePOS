
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();


import HomeScreen from './Screens/HomeScreen';
import AddProdScreen from './Screens/AddProdScreen';
import SettingScreen from './Screens/SettingScreen';



const MainTabScreen = () => (
  	
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  	
)



const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#3C3C3C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerShown: false,
    }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Home',}}  />
        <HomeStack.Screen name="AddProdScreen" component={AddProdScreen} options={{title:'Add Product',}} badge={'3'}/>

</HomeStack.Navigator>
);

export default MainTabScreen;