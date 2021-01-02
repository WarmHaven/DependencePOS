import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, InfoContext, DataContext } from '../../Components/Context';
import MenuScroll from '../../Components/MenuScroll';
import ViewProductAreafrom from '../../Components/ViewProductArea';
import { IconButton, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) =>{

  const { dataState, dataDispatch } = React.useContext(DataContext);
  console.log(dataState);


  const [state, setState] = React.useState({
    productType: null,
    userToken: null,
    userName: null
  });

  useEffect(() => {
      dataDispatch({type: 'SET_PRODUCT_TYPE', productType: 0})
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
          getAllProduct();
        }
        
        // console.log('user token: ', userToken);
        // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 500);

      
  },[state.userToken]);

  useEffect(() => {
      filterProductList();
  },[dataState.PRODUCT_TYPE, dataState.CART_LIST]);


  function filterProductList() {
    if (dataState.PRODUCT_TYPE=='0') {
      var temp = dataState.DEFAULT_PROD_LIST;
    }else{
      var temp = dataState.DEFAULT_PROD_LIST.filter( (item, index) => {
        return item.TYPE==dataState.PRODUCT_TYPE;
      });
    }
    dataDispatch({type:'SET_PRODUCT_LIST', productList:temp});
  }

  function getAllProduct(){
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=getProduct"+
            "&TYPE=0"+
            "&apiKey="+state.userToken         

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {
                // console.warn("getProduct: "+jsonData);
                var allData = JSON.parse(jsonData);
                dataDispatch({type:'SET_PRODUCT_LIST', productList:allData.result});
                dataDispatch({type:'SET_DEFAULT_PRODUCT_LIST', defaultProdList:allData.result});
                

            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })

  }


	return(
		<View style={[styles.container, styles.row]}>
      
        <View style={styles.menuArea}>
          <MenuScroll auth={navigation} />
        </View>
        <View style={styles.mainArea}>
          <View style={{height:'100%'}}>
            <ViewProductAreafrom /> 
          </View>
          <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('CartScreen')}>
              <Icon name="cart" color={'#000'} size={40} />
              <Badge style={styles.badge} size={30}>{dataState.CART_LIST.length}</Badge>
            </TouchableOpacity>
          </View>  
        </View>
		</View>
	)	
};

export default HomeScreen;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#DDB892',
  },
  row: {
    flexDirection:'row',
  },
  cart: {
    padding: 10, 
    borderColor:'#000', 
    borderWidth: 4, 
    borderRadius: 99,
  },
  badge:{ 
    position: 'absolute',
  },
  menuArea:{
    width: '20%',
    // paddingHorizontal: 10,
  },
  mainArea:{
    width: '80%',
    height: '100%',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  cartContainer:{
    alignSelf: 'flex-end', 
    marginRight: 20, 
    marginBottom: 20, 
    position: 'absolute',
    right: 5,
    bottom: 5,
  },

});