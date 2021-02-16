import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { useTheme, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../style/css';
import { DataContext } from '../../Components/Context';
import ProductMenuArea from '../../Components/ProductMenuArea';
import ProductViewArea from '../../Components/ProductViewArea';
import { IconButton, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) =>{

  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  // console.log(dataState);
  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [state, setState] = React.useState({
    productType: null,
    userToken: null,
    userName: null
  });

  useEffect(() => {
      dataDispatch({type: 'SET_PRODUCT_TYPE', productType: 0})
  },[]);

  useEffect(() => {
      if (state.userToken==null) {
        setState({
            ...state,
            userToken: loginState.userToken,
            userName: loginState.userName,
        });
      }else{
        getAllProduct();
      }
      
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
		<View style={[styles.container, styles.row, {backgroundColor: myColor.background}]}>
      
        <View style={styles.menuArea}>
          <ProductMenuArea auth={navigation} />
        </View>
        <View style={styles.mainArea}>
          <View style={{height:'100%'}}>
            <ProductViewArea /> 
          </View>
          <View style={styles.cartContainer}>
            <TouchableOpacity style={[styles.cart,{borderColor: myColor.line}]} onPress={() => navigation.navigate('CartScreen')}>
              <Icon name="cart" color={myColor.line} size={40} />
              <Badge style={styles.badge} size={30}>{dataState.CART_LIST.length}</Badge>
            </TouchableOpacity>
          </View>  
        </View>
		</View>
	)	
};

export default HomeScreen;
