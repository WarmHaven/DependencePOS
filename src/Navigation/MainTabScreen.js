
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import HomeScreen from './Screens/HomeScreen';
import AddProdScreen from './Screens/AddProdScreen';
import CartScreen from './Screens/CartScreen';
import SettingScreen from './Screens/SettingScreen';


import { AuthContext, InfoContext, DataContext } from '../Components/Context';
const MainTabScreen = () => {
  	
  const { dataState, dataDispatch } = React.useContext(DataContext);
  return(  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#7F5539"
      inactiveColor="#f0edf6"
      labeled={false}
      shifting={true}
      barStyle={{ backgroundColor: '#698996' }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#9EB7E5',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          tabBarBadge: dataState.CART_LIST.length,
        }} 
      />
      <Tab.Screen name="Settings" component={SettingScreen} 
        options={{
          tabBarLabel: 'Setting',
          tabBarColor: '#648DE5',
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} />
          ),
        }} 
      />
    </Tab.Navigator>
  )	
}



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
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Home',}} />
        <HomeStack.Screen name="AddProdScreen" component={AddProdScreen} options={{title:'Add Product',}} />
        <HomeStack.Screen name="CartScreen" component={CartScreen} options={{title:'Order List',}} />

</HomeStack.Navigator>
);

export default MainTabScreen;