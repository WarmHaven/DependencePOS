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

import Toast from 'react-native-toast-message';
import RootStackScreen from './src/Navigation/RootStackScreen';
import MainTabScreen from './src/Navigation/MainTabScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, InfoContext, FunContext, DataContext, } from './src/Components/Context';

import { loginReducer, initialLoginState } from './src/Reducers/LoginReducer';
import { dataReducer, initialDataState } from './src/Reducers/DataReducer';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { lightColors, darkColors } from './src/style/CustomColor';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native'

const App: () => React$Node = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 


  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
    myColor: lightColors
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
    myColor: darkColors
  }

  const colorScheme = useColorScheme();
  const theme = colorScheme==="dark" ? CustomDarkTheme : CustomDefaultTheme;


  const [loginState, loginDispatch] = React.useReducer(loginReducer, initialLoginState);
  const [dataState, dataDispatch] = React.useReducer(dataReducer, initialDataState);

  const funContext = React.useMemo(() => ({

    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      // console.warn(foundUser);
      const userToken = String(foundUser.token);
      const userName = foundUser.result;
      console.log(userName);
      
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
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userName');
      } catch(e) {
        console.log(e);
      }
      loginDispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },
    getRemarkType: (token) =>{
        if(dataState.REMARK_TYPE_LIST == null){
          fetch('http://127.0.0.1/Dependency/index.php', {
              method: 'POST',
              headers: {
                  // 'Accept': 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: 
                "METHOD_NAME=getRemarkType"+
                "&apiKey="+token       

          }).then((response) => response.text())
                .then( async (jsonData) => {
                    // console.warn("getRemarkType: "+jsonData);
                    var allData = JSON.parse(jsonData);
                    dataDispatch({type:'SET_REMARK_TYPE_LIST', remarkList: allData.result})


                }).catch((error) => {
                  console.log(error);
                  // alert("網路異常，請重新整理！");
                })
        }
        
    },

    getUndoneOrder: (token)=>{
        fetch('http://127.0.0.1/Dependency/index.php', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 
              "METHOD_NAME=getUndoneOrder"+
              "&apiKey="+token         

                    
                      
        }).then((response) => response.text())
              .then( async (jsonData) => {
                  // console.warn("getUndoneOrder: "+jsonData);
                  var allData = JSON.parse(jsonData);
                  if (allData.code!=-1) {

                    // console.log(allData.result[0].OrderMenu, allData.result[0].OrderItems,);

                    dataDispatch({type:'SET_ORDER_MENU', orderMenuList:allData.result[0].OrderMenu});
                    dataDispatch({type: 'SET_ORDER_MENU_TYPE', orderMenuType: allData.result[0].OrderMenu[0].OrderNo})
                    dataDispatch({type:'SET_DEFAULT_ORDER_LIST', defaultOrderList:allData.result[0].OrderItems});
                  }

              }).catch((error) => {
                console.log(error);
                // alert("網路異常，請重新整理！");
              })
    }
    
  }), []);
  React.useEffect(() => {
    setTimeout(async() => {
      let userToken, userName;
      userToken=null; userName=null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      loginDispatch({ type: 'RETRIEVE_TOKEN', id: userName, token: userToken });
    }, 1500);
  }, []);



  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
      <AppearanceProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <FunContext.Provider value={funContext}>
              <DataContext.Provider value={{dataState, dataDispatch, loginState, loginDispatch}}>
                <NavigationContainer theme={theme}>
                  { loginState.userToken !== null ? (
                    <MainTabScreen />
                  )
                  :
                    <RootStackScreen/>
                  }
                  <Toast ref={(ref) => Toast.setRef(ref)} />
                  <KeyboardSpacer/>
                </NavigationContainer>
              </DataContext.Provider>
            </FunContext.Provider>
          </ThemeProvider>
        </PaperProvider>
      </AppearanceProvider>
  );
};

export default App;
