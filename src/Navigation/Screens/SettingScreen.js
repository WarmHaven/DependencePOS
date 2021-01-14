import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';


import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, InfoContext, DataContext } from '../../Components/Context';
import MenuScroll from '../../Components/MenuScroll';
import ViewProductAreafrom from '../../Components/ViewProductArea';

const SettingScreen = () =>{

  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { signOut, toggleTheme } = React.useContext(InfoContext);


  const [state, setState] = React.useState({
      userName: null,
      userToken: null,
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



  // <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
	return(
		<View style={[styles.container, ]}>

          <View style={{}}>
              <Avatar.Image 
                  source={{
                      uri: 'https://www.haven2u.com/Dependency/images/test.jpg'
                  }}
                  size={200}
              />   
          </View>
          <Title style={[styles.title, {marginTop:20}]}>{state.userName}</Title>
          <View style={styles.row}>
            <Caption style={styles.caption}>Administrator</Caption>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
                onPress={() => {signOut()}}
                style={[styles.signIn, {
                    backgroundColor: '#7F5539',
                    borderColor: '#7F5539',
                    borderWidth: 1,
                    marginTop: 10
                }]}
            >
                <Text style={[styles.title, {
                    color: '#fff'
                }]}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>v1.0.0 beta001</Text>
          </View>
      


		</View>
	)	
};

export default SettingScreen;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#DDB892',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    width: '20%'
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    // marginTop: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

});