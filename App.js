/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';


import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
  


import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import RootStackScreen from './src/Navigation/RootStackScreen';
import MainTabScreen from './src/Navigation/MainTabScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, InfoContext, DataContext, } from './src/Components/Context';

import { loginReducer, initialLoginState } from './src/Reducers/LoginReducer';
import { dataReducer, initialDataState } from './src/Reducers/DataReducer';


const App: () => React$Node = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);


  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


  const [loginState, loginDispatch] = React.useReducer(loginReducer, initialLoginState);
  const [dataState, dataDispatch] = React.useReducer(dataReducer, initialDataState);

  const infoContext = React.useMemo(() => ({

    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      // console.warn(foundUser);
      const userToken = String(foundUser.token);
      const userName = foundUser.result;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userName', userName);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      loginDispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userName');
      } catch(e) {
        console.log(e);
      }
      loginDispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },
    
  }), []);

  React.useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      loginDispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);



  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
      <PaperProvider theme={theme}>
      <InfoContext.Provider value={infoContext}>
      <DataContext.Provider value={{dataState, dataDispatch}}>
      <NavigationContainer theme={theme}>
        { loginState.userToken !== null ? (
          <MainTabScreen />
        )
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
      </DataContext.Provider>
      </InfoContext.Provider>
      </PaperProvider>
  );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5b5b5b',

    },
});

export default App;
