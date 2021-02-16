import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { Switch, useTheme, Text, } from 'react-native-paper';
import { styles } from '../style/css';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from './Context';

import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { Isao } from 'react-native-textinput-effects';
import RemarkArea from './RemarkArea';
// import KeyboardSpacer from 'react-native-keyboard-spacer';

const CartListScroll = ({auth}) =>{
  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [count, setCount] = useState(dataState.ORDER_COUNT);
  const [totalPrice, setTotalPrice] = useState(dataState.ORDER_PRICE);
  const [plus, setPlus] = useState('0');
  const [minus, setminus] = useState('0');
 
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
      getRemarkType();
    }
    setCount(dataState.ORDER_COUNT);
    setTotalPrice(dataState.ORDER_PRICE);
      
  },[state.userToken, dataState.CART_LIST, dataState.ORDER_COUNT, dataState.ORDER_PRICE]);

  async function getRemarkType(){
    if(dataState.REMARK_TYPE_LIST == null){
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=getRemarkType"+
            "&apiKey="+state.userToken         

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
  }

  

  const renderItem = ({ item, index }) => {
    const backgroundColor = myColor.button;
    console.log(dataState.CART_LIST[index].minus);
    return (

      <Popover
        // mode={PopoverMode.TOOLTIP}
        placement={'auto'}
        popoverStyle={styles.popover}
        from={(
          <TouchableOpacity>
            <Item
              item={item}
              onPress={() => [ dataDispatch({type: 'DELETE_CART_LIST', id: item.id})]}
              style={{ backgroundColor }}
            />
          </TouchableOpacity>
        )}>
        <ScrollView style={{height: 'auto'}}>
        <Isao
          label={'加價'}
          activeColor={'#da7071'}
          borderHeight={8}
          inputPadding={16}
          labelHeight={34}
          labelStyle={{fontSize: 28, fontWeight:'bold'}}
          inputStyle={{fontSize: 28, fontWeight:'bold'}}
          style={{backgroundColor: '#f9f5ed', fontSize: 30, borderTopLeftRadius: 20,borderTopRightRadius: 20,}}
          passiveColor={'#dadada'}
          keyboardType='number-pad'
          maxLength={5}
          
          value={dataState.CART_LIST[index].plus}
          defaultValue={dataState.CART_LIST[index].plus}
          onChangeText={(e) => { dataDispatch({type:'SET_REMARK_PLUS', value:e.replace(/[^0-9]/g, ''), id:item.id}) }}
        />

        <Isao
          label={'減價'}
          activeColor={'#da7071'}
          borderHeight={8}
          inputPadding={16}
          labelHeight={34}
          labelStyle={{fontSize: 28, fontWeight:'bold' }}
          inputStyle={{fontSize: 28, fontWeight:'bold'}}
          style={{backgroundColor: '#f9f5ed', fontSize: 30, }}
          passiveColor={'#dadada'}
          keyboardType='number-pad'
          maxLength={5}

          value={dataState.CART_LIST[index].minus} 
          defaultValue={dataState.CART_LIST[index].minus}
          onChangeText={(e) => { dataDispatch({type:'SET_REMARK_MINUS', value:e.replace(/[^0-9]/g, ''), id:item.id}) }}
        />
        <RemarkArea key={item.id} ID={item.id}  />
        </ScrollView>
      </Popover>

      
    );
  };

  if (state.userToken==null) {
    return(
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large"/>
      </SafeAreaView>

    );
  }
  return(
    <SafeAreaView style={[styles.container, {backgroundColor: myColor.background}]}>
      <FlatList
        data={dataState.CART_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}        
      />
      <FootArea myColor={myColor} count={count} totalPrice={totalPrice}/>
      
    </SafeAreaView>
  ) 
};

export default CartListScroll;


const Item = ({ item, onPress, style }) => (
  
    <View style={[styles.row, styles.CartListItem, style]}>
      <View style={styles.nameArea}>
        <Text style={styles.CartListText}>No.{item.id}  {item.name}</Text>
        <Remark item={item} />
      </View>
      <View style={styles.countArea}>
        <Text style={styles.CartListText}>{item.count}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.CartListText}>{item.unitPrice}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.CartListText}>${item.totalPrice+parseInt(item.plus==''? 0:item.plus)-parseInt(item.minus==''? 0:item.minus)}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.deleteArea}>
        <Icon name="delete" color={'#000'} size={40} />
      </TouchableOpacity>
    </View>
  
);


const FootArea = ({count, totalPrice, myColor}) => {
  const { dataState, dataDispatch } = React.useContext(DataContext);
  // console.log(dataState);
  const [discount1, setDiscount1] = React.useState(false);
  const [discount2, setDiscount2] = React.useState(false);

  const onToggleDiscount1 = () => {setDiscount1(!discount1); discount2? setDiscount2(!discount2):null; dataDispatch({type:'RESET_DISCOUNT'}) }
  const onToggleDiscount2 = () => {setDiscount2(!discount2); discount1? setDiscount1(!discount1):null; dataDispatch({type:'RESET_DISCOUNT'}) }

  return(
    <View style={[styles.row, styles.footer, {backgroundColor:myColor.selected}]}>
      <View style={[styles.row, styles.totalCount]}>
        <View style={[styles.row,{alignItems:'center'}]}>
          <TouchableOpacity onPress={onToggleDiscount1} style={{marginHorizontal: 10, height:40, justifyContent:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',}}>折扣</Text>
          </TouchableOpacity>
          <DiscountBox isOpen={discount1} value={dataState.DISCOUNT} dataDispatch={dataDispatch} mode={1} />

          <TouchableOpacity onPress={onToggleDiscount2} style={{marginHorizontal: 10, height:40, justifyContent:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',}}>折讓</Text>
          </TouchableOpacity>
          <DiscountBox isOpen={discount2} value={dataState.DISCOUNT} dataDispatch={dataDispatch} mode={2} />

        </View>
        <Text style={styles.CartListText}>{count}</Text>
      </View>

      <View style={styles.totalPrice}>
        <Text style={styles.CartListText}>${totalPrice-dataState.DISCOUNT_VALUE}</Text>
      </View>
    </View>
  )
};

const Remark = ({item}) =>{
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const remark = item.remark.map((item, index) =>{
    // console.log(item===true? dataState.REMARK_TYPE_LIST[index]:'no'+index)
    if (item===true) {
      return(
        dataState.REMARK_TYPE_LIST[index].title+'、'
      )
    }
  });


  return(
    <Text style={styles.remark}>
      {item.plus? '+$'+item.plus+'、':null}
      {item.minus? '-$'+item.minus+'、':null}
      {remark}
      
    </Text>
  )
};


const DiscountBox = ({isOpen, value, dataDispatch, mode}) => {
  const baseStyles = {
      open: {
          width: mode==1? 80:120,
          height: 40,
          paddingHorizontal:10,
          fontSize:20,
          fontWeight: 'bold',
          color: '#000',
      },
      closed: {
          width: 0,
      },
  };
  const textStyle = isOpen ? baseStyles.open : baseStyles.closed;
  const divStyle = { 
    backgroundColor: isOpen? '#E0E0E0':'transparent', 
    borderRadius:10, 
    // marginLeft: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 

  }

  return (
      <View style={[divStyle, styles.row]}>
        <TextInput 
          // clearTextOnFocus={true} 
          style={textStyle} 
          onChangeText={text => dataDispatch({type:'SET_DISCOUNT', discount:text.replace(/[^0-9]/g, ''), mode:mode})} 
          defaultValue={value}
          value={value} 
          editable={isOpen} 
          textAlign={'center'}
          keyboardType='number-pad' 
          maxLength={mode==1? 2:5}
        />
      </View>
  );
};
