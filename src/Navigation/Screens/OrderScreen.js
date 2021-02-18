import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Modal,
} from 'react-native-paper';
import { styles } from '../../style/css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Isao } from 'react-native-textinput-effects';
import Toast from 'react-native-toast-message';


import { FunContext, DataContext } from '../../Components/Context';
import OrderMenuArea from '../../Components/OrderMenuArea';
import OrderViewArea from '../../Components/OrderViewArea';


const OrderScreen = ({navigation}) =>{

  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const { getRemarkType, getUndoneOrder } = React.useContext(FunContext);
  const [ modal, setModal ] = React.useState(false);
  const [ pay, setPay ] = React.useState('');

  const [state, setState] = React.useState({
    userToken: null,
    userName: null
  });

  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  useEffect(() => {
      if (state.userToken==null) {
        setState({
            ...state,
            userToken: loginState.userToken,
            userName: loginState.userName,
        });
      }else{
        getUndoneOrder(loginState.userToken);
        getRemarkType(loginState.userToken);
      }
      
  },[state.userToken, ]);

  useEffect(() => {
      filterCurrentOrder();
  },[dataState.ORDER_MENU_TYPE, dataState.DEFAULT_ORDER_LIST ]);

  function filterCurrentOrder() {
    
    var temp = dataState.DEFAULT_ORDER_LIST.filter( (item, index) => {
      // console.log(item, dataState.ORDER_MENU_TYPE, item.Main[0].OrderNo, item.Main[0].OrderNo==dataState.ORDER_MENU_TYPE);
      return item.Main[0].OrderNo==dataState.ORDER_MENU_TYPE;
    });
    
    dataDispatch({type:'SET_CURRENT_ORDER', currentOrder:temp});
  }

  function doneOrder(orderNo){
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=doneOrder"+
            "&orderNo="+orderNo+
            "&apiKey="+state.userToken         

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {
                console.warn("doneOrder: "+jsonData);
                var allData = JSON.parse(jsonData);
                console.log(allData.result);
                if (allData.code == 0) {
                  Toast.show({
                    text1: allData.result,
                    text2: '',
                    visibilityTime: 5000,
                  });
                  getUndoneOrder(loginState.userToken);
                }else{
                  Alert.alert('ERROR',allData.result);
                }
                // dataDispatch({type:'SET_ORDER_MENU', orderMenuList:allData.result[0].OrderMenu});
                // dataDispatch({type: 'SET_ORDER_MENU_TYPE', orderMenuType: allData.result[0].OrderMenu[0].OrderNo})
                // dataDispatch({type:'SET_DEFAULT_ORDER_LIST', defaultOrderList:allData.result[0].OrderItems});
                
            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })
  }

  function cancelOrder(orderNo){
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=cancelOrder"+
            "&orderNo="+orderNo+
            "&apiKey="+state.userToken         

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {
                console.warn("cancelOrder: "+jsonData);
                var allData = JSON.parse(jsonData);
                console.log(allData.result);
                if (allData.code == 0) {
                  Toast.show({
                    text1: allData.result,
                    text2: '',
                    visibilityTime: 5000,
                  });
                  getUndoneOrder(loginState.userToken);
                }else{
                  Alert.alert('ERROR',allData.result);
                }
                // dataDispatch({type:'SET_ORDER_MENU', orderMenuList:allData.result[0].OrderMenu});
                // dataDispatch({type: 'SET_ORDER_MENU_TYPE', orderMenuType: allData.result[0].OrderMenu[0].OrderNo})
                // dataDispatch({type:'SET_DEFAULT_ORDER_LIST', defaultOrderList:allData.result[0].OrderItems});
                
            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })
  }

  const showModal = () => {
    setModal(true);
    setPay('');
  }
  const hideModal = () => {
    if(pay == ''){
      setModal(false);
    }else if (pay<dataState.CURRENT_ORDER_TOTALPRICE) {
      setPay('');
      Toast.show({
        type: 'error',
        text1: '無法找零！還差 '+(dataState.CURRENT_ORDER_TOTALPRICE-pay),
        text2: '',
        visibilityTime: 5000,
      });
    }else{
      setModal(false);
      Alert.alert('找零 $'+(pay-dataState.CURRENT_ORDER_TOTALPRICE),'',
        [ 
          {text: 'Cancel', onPress: () =>  {} },
          { text: 'OK', onPress: () => doneOrder(dataState.ORDER_MENU_TYPE) }
        ],
        { cancelable: false }
      )      
    }
  }

  const cencelAlert = () =>{
    Alert.alert('確認是否取消此訂單','',
      [ 
        {text: 'Cancel', onPress: () =>  {} },
        { text: 'OK', onPress: () => cancelOrder(dataState.ORDER_MENU_TYPE) }
      ],
      { cancelable: false }
    )  
  }





	return(
		<View style={[styles.container, styles.row, {backgroundColor: myColor.background}]}>
      <View style={styles.menuArea}>
          <OrderMenuArea auth={navigation} />
      </View>
      <View style={[styles.mainArea, {paddingTop: 20}]}>
          <Text style={styles.orderHeaderText}>訂單號碼：{dataState.ORDER_MENU_TYPE}</Text>
          <OrderViewArea auth={navigation} />
          <View style={[styles.row, styles.orderItemFoot,{borderColor: myColor.line} ]}>
            <Text style={styles.orderHeaderText}>總計：</Text>
            <Text style={styles.orderHeaderText}>${dataState.CURRENT_ORDER_TOTALPRICE}</Text>
          </View>
          <View style={[styles.row, styles.orderFootButtonArea,{borderColor: myColor.line} ]}>

            <TouchableOpacity style={[styles.orderFootButton, {backgroundColor: myColor.button2}]} onPress={cencelAlert}>
              <Text style={[styles.orderFootBtnText, {color:'#000'}]}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.orderFootButton, {backgroundColor: myColor.button2}]} onPress={showModal} >
              <Text style={[styles.orderFootBtnText, {color:'#000'}]}>結帳</Text>
            </TouchableOpacity>
          </View> 

          <Modal visible={modal} onDismiss={hideModal} transparent={true}>
            <View style={styles.modalView}>
              <Isao
                label={'實收金額'}
                activeColor={'#da7071'}
                borderHeight={8}
                inputPadding={16}
                labelHeight={34}
                labelStyle={{fontSize: 28, fontWeight:'bold' }}
                inputStyle={{fontSize: 28, fontWeight:'bold'}}
                style={{backgroundColor: '#f9f5ed', fontSize: 30, width:'90%'}}
                passiveColor={'#dadada'}
                keyboardType='number-pad'
                maxLength={5}
                onSubmitEditing={hideModal}
                returnKeyType={'done'}
                autoFocus={true}

                value={pay} 
                defaultValue={pay}
                onChangeText={(e) => setPay(e.replace(/[^0-9]/g, ''))}
              />
            </View>
          </Modal>
      </View>
		</View>
	)	
};

export default OrderScreen;