import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from './Context';

import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { Kohana, Isao } from 'react-native-textinput-effects';
import RemarkArea from './RemarkArea';

const CartListScroll = ({auth}) =>{
  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const [count, setCount] = useState(dataState.CART_COUNT);
  const [totalPrice, setTotalPrice] = useState(dataState.CART_PRICE);
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
    setCount(dataState.CART_COUNT);
    setTotalPrice(dataState.CART_PRICE);
      
  },[state.userToken, dataState.CART_LIST, dataState.CART_COUNT, dataState.CART_PRICE]);

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

  // async function AddOrder(){
  //   if (state.userToken != null) {  
  //     fetch('http://127.0.0.1/Dependency/index.php', {
  //         method: 'POST',
  //         headers: {
  //             // 'Accept': 'application/x-www-form-urlencoded',
  //             'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: 
  //           "METHOD_NAME=getProductType"+
  //           "&apiKey="+state.userToken         

                  
                    
  //     }).then((response) => response.text())
  //           .then( async (jsonData) => {

  //               // Showing response message coming from server after inserting records.
  //               // console.warn("getProductType: "+jsonData);
  //               var allData = JSON.parse(jsonData);

  //               setState({
  //                 ...state,
  //                 productType: allData.result
  //               });


  //           }).catch((error) => {
  //             console.log(error);
  //             // alert("網路異常，請重新整理！");
  //           })


      
  //   }
  // }

  const renderItem = ({ item, index }) => {
    const backgroundColor = "#B08968";
    return (

      <Popover
        // mode={PopoverMode.TOOLTIP}
        placement={'bottom'}
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
          
          defaultValue={dataState.CART_LIST[index].plus}
          onChangeText={(e) => { dataDispatch({type:'SET_REMARK_PLUS', value:e, id:item.id}) }}
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
          
          defaultValue={dataState.CART_LIST[index].minus}
          onChangeText={(e) => { dataDispatch({type:'SET_REMARK_MINUS', value:e, id:item.id}) }}
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataState.CART_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}        
      />
      <FootArea count={count} totalPrice={totalPrice}/>
    </SafeAreaView>
  ) 
};

export default CartListScroll;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: '#000',
    // borderRightWidth: 2,
    backgroundColor: '#DDB892',
  },
  row: {
    flexDirection:'row',
  },
  item: {
    backgroundColor: "#B08968",
    padding: 20,
    // paddingLeft: 40,     
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 2,
    // marginVertical: 4,
  },
  footer:{
    backgroundColor: "#B08968",
    padding: 20,   
    alignItems: 'center',
    borderColor: '#000',
    borderTopWidth: 2,
  },
  header: {
    fontSize: 36,
    paddingHorizontal: 10,
    backgroundColor: '#DDB892',
    color: '#7F5539',
  },
  title: {
    fontSize: 24,
  },
  controlBar: {
    alignItems: 'flex-end'
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
  deleteArea:{
    width:'10%',
    alignItems: 'center'
  },

  totalCount:{
    width:'70%',
    alignItems: 'flex-end'
  },
  totalPrice:{
    width:'20%',
    alignItems: 'flex-end'
  },
  popover:{
    height: 500,
    width: 400,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#dadada',
  },
  remark:{
    color: '#E0E0E0',
    fontSize: 20,

  }

});



const Item = ({ item, onPress, style }) => (
  
    <View style={[styles.row, styles.item, style]}>
      <View style={styles.nameArea}>
        <Text style={styles.title}>No.{item.id}  {item.name}</Text>
        <Remark item={item} />
      </View>
      <View style={styles.countArea}>
        <Text style={styles.title}>{item.count}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.title}>{item.price}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.title}>{item.totalPrice+parseInt(item.plus==''? 0:item.plus)-parseInt(item.minus==''? 0:item.minus)}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.deleteArea}>
        <Icon name="delete" color={'#000'} size={40} />
      </TouchableOpacity>
    </View>
  
);


const FootArea = ({count, totalPrice}) => {
  return(
    <View style={[styles.row, styles.footer]}>
      <View style={styles.totalCount}>
        <Text style={styles.title}>{count}</Text>
      </View>
      <View style={styles.totalPrice}>
        <Text style={styles.title}>{totalPrice}</Text>
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
