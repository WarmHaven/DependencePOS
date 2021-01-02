import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, InfoContext, DataContext } from '../../Components/Context';
import CartListScroll from '../../Components/CartListScroll';

const CartScreen = ({ navigation }) =>{

  const { dataState, dataDispatch } = React.useContext(DataContext);


  const [state, setState] = React.useState({
    userToken: null,
    userName: null
  });

  useEffect(() => {
      setTimeout(async() => {
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


  function Cancel() {
    dataDispatch({type: 'REMOVE_ALL_CART_LIST'});
    navigation.goBack();
  }

	return(
		<View style={[styles.container, styles.row2]}>
      <View style={[styles.table, styles.tableBorder]}>
        <View style={[styles.row, styles.item]}>
          <View style={styles.nameArea}>
            <Text style={styles.title}>名稱</Text>
          </View>
          <View style={styles.countArea}>
            <Text style={styles.title}>數量</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.title}>單價</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.title}>金額</Text>
          </View>
        </View>
        <CartListScroll auth={navigation} />
      </View>

      <View style={[styles.row, {width: '90%', height: '10%', marginTop:10}]}>
        <TouchableOpacity onPress={()=> Cancel()} style={[styles.btnCancel]}>
          <Text style={styles.title}>取消訂單</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={[styles.btnConfirm]}>
          <Text style={styles.title}>建立訂單</Text>
        </TouchableOpacity>
      </View>
		</View>
	)	
};

export default CartScreen;


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

  table:{
    width: '90%',
    height: '80%',
  },
  tableBorder:{
    borderWidth: 2,
    borderColor: '#000',
  },

  btnCancel:{
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: '#000',
  },
  btnConfirm:{
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: '#000',
  },



  item: {
    backgroundColor: "#E0E0E0",
    padding: 20,
    // paddingLeft: 40,     
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 2,
    // marginVertical: 4,
  },
  title: {
    fontSize: 30,
  },

  idArea:{
    width:'10%',
  },
  nameArea:{
    width:'60%',
  },
  countArea:{
    width:'10%',
    alignItems: 'flex-end'
  },
  priceArea:{
    width:'10%',
    alignItems: 'flex-end'
  },



});