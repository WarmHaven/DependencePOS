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
import { styles } from '../../style/css';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FunContext, DataContext } from '../../Components/Context';


const SettingScreen = () =>{

  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const { signOut } = React.useContext(FunContext);

  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [state, setState] = React.useState({
      userName: loginState.userName,
      userToken: loginState.userToken,
  });

  // <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
	return(
		<View style={[styles.container, {backgroundColor: myColor.background} ]}>

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
          <View style={styles.SignOutbutton}>
            <TouchableOpacity
                onPress={() => {signOut()}}
                style={[styles.signIn, {
                    backgroundColor: myColor.button,
                    borderColor: myColor.selected,
                    borderWidth: 1,
                    marginTop: 10
                }]}
            >
                <Text style={[styles.title, ]}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>a1.0.3</Text>
          </View>
      


		</View>
	)	
};

export default SettingScreen;