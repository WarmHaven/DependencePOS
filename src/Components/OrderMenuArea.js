import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme, Text, } from 'react-native-paper';
import { styles } from '../style/css';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FunContext, DataContext } from './Context';

const OrderMenuArea = ({auth}) =>{
  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const { getUndoneOrder } = React.useContext(FunContext);
  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [selectedId, setSelectedId] = useState(dataState.ORDER_MENU_TYPE);
  const [state, setState] = React.useState({
    orderMenuList: null,
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
        // setState({
        //   ...state,
        //   orderMenuList: dataState.ORDER_MENU_LIST
        // })
      }
      
  },[dataDispatch.ORDER_MENU_LIST, ]);

  useEffect(() => {
      setState({
        ...state,
        orderMenuList: dataState.ORDER_MENU_LIST
      })
      setSelectedId(dataState.ORDER_MENU_TYPE);
  },[ dataState.ORDER_MENU_LIST, dataState.ORDER_MENU_TYPE]);
  const renderItem = ({ item }) => {
    const backgroundColor = item.OrderNo === selectedId ? myColor.selected : myColor.button;
    // console.log(item);
    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.OrderNo), dataDispatch({type: 'SET_ORDER_MENU_TYPE', orderMenuType: item.OrderNo})]}
        style={{ backgroundColor, borderColor: myColor.line }}
      />
    );
  };

  if (state.orderMenuList&&state.orderMenuList.length==0) {
    return(
      <SafeAreaView style={[styles.MenuScrollContainer,{borderColor: myColor.line, backgroundColor: myColor.background}]}>
        <View style={styles.controlBar}>
          <TouchableOpacity onPress={()=>getUndoneOrder(loginState.userToken)}>
            <Icon name="reload" color={myColor.line} size={50} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={ () => console.log('test') }>
          <View style={{justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator size="large"/>
                <Text>No Orders..</Text>
              </View>
            </TouchableOpacity>
      </SafeAreaView>

    );
  }
  return(
    <SafeAreaView style={[styles.MenuScrollContainer,{borderColor: myColor.line, backgroundColor: myColor.background}]}>
      <View style={styles.controlBar}>
        <TouchableOpacity onPress={()=>getUndoneOrder(loginState.userToken)}>
          <Icon name="reload" color={myColor.line} size={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.orderMenuList}
        renderItem={renderItem}
        keyExtractor={(item) => item.OrderNo}
        extraData={selectedId}
      />
    </SafeAreaView>
  ) 
};

export default OrderMenuArea;


const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style, ]}>
    <Text style={styles.menuText}>{item.OrderNo}</Text>
    <View style={[styles.row, {alignItems: ''}]}>
      <Text style={styles.menuText}>{item.Count}       </Text>
      <Text style={styles.menuText}>${item.TotalPrice-item.Discount}</Text>
    </View>
    <Text style={styles.menuDateText}>{item.CreateDate}</Text>
  </TouchableOpacity>
);
