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
import { DataContext } from './Context';

const MenuScroll = ({auth}) =>{
  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);
  const paperTheme = useTheme();
  const { myColor } = paperTheme;

  const [selectedId, setSelectedId] = useState('0');
  const [state, setState] = React.useState({
    productType: null,
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
        
        getProductType();
      }
      
  },[state.userToken]);


  async function getProductType(){
    if (state.userToken != null) {  
      fetch('http://127.0.0.1/Dependency/index.php', {
          method: 'POST',
          headers: {
              // 'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 
            "METHOD_NAME=getProductType"+
            "&apiKey="+state.userToken         

                  
                    
      }).then((response) => response.text())
            .then( async (jsonData) => {

                // Showing response message coming from server after inserting records.
                // console.warn("getProductType: "+jsonData);
                var allData = JSON.parse(jsonData);

                setState({
                  ...state,
                  productType: allData.result
                });


            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })


      
    }
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? myColor.selected : myColor.button;
    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.id), dataDispatch({type: 'SET_PRODUCT_TYPE', productType: item.id})]}
        style={{ backgroundColor, borderColor: myColor.line }}
      />
    );
  };

  if (state.userToken==null) {
    return(
      <SafeAreaView style={[styles.MenuScrollContainer,{borderColor: myColor.line, backgroundColor: myColor.background}]}>
        <View style={styles.controlBar}>
          <TouchableOpacity onPress={()=>console.warn('click edit btn')}>
            <Icon name="playlist-edit" color={myColor.line} size={50} />
          </TouchableOpacity>
        </View>
        <ActivityIndicator size="large"/>
      </SafeAreaView>

    );
  }
  return(
    <SafeAreaView style={[styles.MenuScrollContainer,{borderColor: myColor.line, backgroundColor: myColor.background}]}>
      <View style={styles.controlBar}>
        <TouchableOpacity onPress={()=>auth.navigate('AddProdScreen')}>
          <Icon name="playlist-edit" color={myColor.line} size={50} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.productType}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  ) 
};

export default MenuScroll;


const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style, ]}>
    <Text style={styles.menuText}>{item.title}</Text>
  </TouchableOpacity>
);
