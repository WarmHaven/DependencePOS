import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useTheme, } from 'react-native-paper';
import { styles } from '../../style/css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { DataContext } from '../../Components/Context';
import CartListScroll from '../../Components/CartListScroll';

const CartScreen = ({ navigation }) =>{

  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [state, setState] = React.useState({
    userToken: null,
    userName: null
  });

  useEffect(() => {
      if (state.userToken==null) {
        setState({
            ...state,
            userToken: loginState.userToken,
            userName: loginState.userName,
        });
      }else{

      }
      
  },[state.userToken]);


  function Cancel() {
    dataDispatch({type: 'REMOVE_ALL_CART_LIST'});
    navigation.goBack();
  }

  function CreateOrder() {
    // console.log(JSON.stringify(dataState.CART_LIST));
    // console.log(dataState);

    const { ORDER_COUNT, ORDER_PRICE, DISCOUNT_VALUE } = dataState;

    var orderList = [];
    orderList.push({count: ORDER_COUNT, totalPrice: ORDER_PRICE, discount: DISCOUNT_VALUE});
    // console.log(orderList);

    InsertOrder(orderList);
  }

  async function InsertOrder(orderList){
    if (state.userToken != null) {  
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=insertOrder"+
            "&apiKey="+state.userToken+
            "&cartList="+JSON.stringify(dataState.CART_LIST)+
            "&orderList="+JSON.stringify(orderList)        

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {
                console.warn("getProductType: "+jsonData);
                var allData = JSON.parse(jsonData);
                console.log(allData);
                
                if (allData.code != 0) {
                  Alert.alert('結果',allData.result);
                }else{
                  Alert.alert('結果',allData.result);
                }

                // setState({
                //   ...state,
                //   productType: allData.result
                // });


            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })


      
    }
  }

	return(
		<View style={[styles.container, {backgroundColor: myColor.background}]}>
      <View style={[styles.table, styles.tableBorder, {borderColor: myColor.line}]}>
        <View style={[styles.row, styles.tableHeader]}>
          <View style={styles.nameArea}>
            <Text style={styles.tableHeaderText}>名稱</Text>
          </View>
          <View style={styles.countArea}>
            <Text style={styles.tableHeaderText}>數量</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.tableHeaderText}>單價</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.tableHeaderText}>金額</Text>
          </View>
        </View>
        <CartListScroll auth={navigation} />
      </View>

      <View style={[styles.row, {width: '90%', height: '10%', marginTop:10}]}>
        <TouchableOpacity onPress={()=> Cancel()} style={[styles.btnCancel, {backgroundColor: myColor.button2}]}>
          <Text style={styles.tableHeaderText}>取消訂單</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          disabled={dataState.CART_LIST.length==0? true:false} 
          onPress={()=> CreateOrder()} 
          style={[styles.btnConfirm, {backgroundColor: dataState.CART_LIST.length==0? '#ADADAD':myColor.button2}]}
        >
          <Text style={styles.tableHeaderText}>建立訂單</Text>
        </TouchableOpacity>
      </View>
		</View>
	)	
};

export default CartScreen;
