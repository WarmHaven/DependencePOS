import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { DataContext } from '../../Components/Context';
import MenuScroll from '../../Components/MenuScroll';
import ViewProductAreafrom from '../../Components/ViewProductArea';

const AddProdScreen = ( navigation ) =>{

  const { dataState, dataDispatch } = React.useContext(DataContext);


  const [state, setState] = React.useState({
    userToken: null,
    userName: null
  });

  useEffect(() => {

  },[]);

  useEffect(() => {
      setTimeout(async() => {
        // setIsLoading(false);
        let userToken, userName;
        userToken = null;
        userName = null;
        if (state.userToken==null) {
          try {
            userToken = await AsyncStorage.getItem('userToken');
            userName = await AsyncStorage.getItem('userName');

            setState({
                ...state,
                userToken: userToken,
                userName: userName,
            });
          } catch(e) {
            console.log(e);
          }
        }else{

        }
        
        // console.log('user token: ', userToken);
        // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 500);

      
  },[state.userToken]);



	return(
		<View style={[styles.container, styles.row]}>
      <Text>AddProdScreen</Text>
		</View>
	)	
};

export default AddProdScreen;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#DDB892',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection:'row',
  },


  menuArea:{
    width: '20%',
    // paddingHorizontal: 10,
  },
  mainArea:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  }

});