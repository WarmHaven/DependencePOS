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

import { FunContext, DataContext } from '../../Components/Context';
import CartListScroll from '../../Components/CartListScroll';

const CartScreen = ({ navigation }) =>{

  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const { getUndoneOrder } = React.useContext(FunContext);

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
    const { ORDER_COUNT, ORDER_PRICE, DISCOUNT_VALUE } = dataState;
    var orderList = [];
    orderList.push({count: ORDER_COUNT, totalPrice: ORDER_PRICE, discount: DISCOUNT_VALUE});

    _Insert(orderList);
  }

  function MergeOrder(){
    const { ORDER_COUNT, ORDER_PRICE, DISCOUNT_VALUE } = dataState;
    var orderList = [];
    orderList.push({count: ORDER_COUNT, totalPrice: ORDER_PRICE, discount: DISCOUNT_VALUE});
    
    _Merge(orderList);
  }

  async function _Insert(orderList){
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
                // console.warn("InsertOrder: "+jsonData);
                var allData = JSON.parse(jsonData);
                // console.log(allData);
                
                if (allData.code == 0) {
                  dataDispatch({type:'REMOVE_ALL_CART_LIST'});
                
                  Alert.alert('結果',allData.result,
                    [
                      {text: 'Cancel', onPress: () => {getUndoneOrder(loginState.userToken); navigation.goBack(); } },
                      {text: 'OK', onPress: ()=>  {getUndoneOrder(loginState.userToken); navigation.navigate('Order'); navigation.goBack(); } },
                    ],
                    { cancelable: false }
                  );

                  
                }else{
                  Alert.alert('結果',allData.result);
                }

            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })


      
    }
  }

  async function _Merge(orderList){
    if (state.userToken != null) {  
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=mergeOrder"+
            "&apiKey="+state.userToken+
            "&orderNo="+dataState.MERGE_ORDERNO+
            "&cartList="+JSON.stringify(dataState.CART_LIST)+
            "&orderList="+JSON.stringify(orderList)        

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {
                // console.warn("InsertOrder: "+jsonData);
                var allData = JSON.parse(jsonData);
                // console.log(allData);
                
                if (allData.code == 0) {
                  dataDispatch({type:'REMOVE_ALL_CART_LIST'});
                
                  Alert.alert('結果',allData.result,
                    [
                      {text: 'Cancel', onPress: () => {getUndoneOrder(loginState.userToken); navigation.goBack(); } },
                      {text: 'OK', onPress: ()=>  {getUndoneOrder(loginState.userToken); navigation.navigate('Order'); navigation.goBack(); } },
                    ],
                    { cancelable: false }
                  );

                  
                }else{
                  Alert.alert('結果',allData.result);
                }

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

      <View style={[styles.row, {width: '90%', height: '10%', marginTop:10, justifyContent: 'center', }]}>
        <TouchableOpacity onPress={()=> Cancel()} style={[styles.btnCancel, {backgroundColor: myColor.button2}]}>
          <Text style={styles.tableHeaderText}>取消訂單</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          disabled={true} 
          onPress={()=> {}} 
          style={[styles.btnConfirm, {backgroundColor: '#ADADAD'}]}
        >
          <Text style={styles.tableHeaderText}>{dataState.MERGE_ORDERNO}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          disabled={dataState.CART_LIST.length==0? true:false} 
          onPress={()=> dataState.ORDER_MENU_TYPE===null? CreateOrder():MergeOrder() } 
          style={[styles.btnConfirm, {backgroundColor: dataState.CART_LIST.length==0? '#ADADAD':myColor.button2}]}
        >
          <Text style={styles.tableHeaderText}>{dataState.MERGE_ORDERNO===null?'建立訂單':'合併訂單'}</Text>
        </TouchableOpacity>
      </View>
		</View>
	)	
};

export default CartScreen;
