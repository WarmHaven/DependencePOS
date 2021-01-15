import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from './Context';

const MenuScroll = ({auth}) =>{
  const { dataState, dataDispatch, loginState, loginDispatch } = React.useContext(DataContext);

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
    const backgroundColor = item.id === selectedId ? "#7F5539" : "#B08968";
    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.id), dataDispatch({type: 'SET_PRODUCT_TYPE', productType: item.id})]}
        style={{ backgroundColor }}
      />
    );
  };

  if (state.userToken==null) {
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.controlBar}>
          <TouchableOpacity onPress={()=>console.warn('click edit btn')}>
            <Icon name="playlist-edit" color={'#000'} size={50} />
          </TouchableOpacity>
        </View>
        <ActivityIndicator size="large"/>
      </SafeAreaView>

    );
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.controlBar}>
        <TouchableOpacity onPress={()=>auth.navigation.navigate('AddProdScreen')}>
          <Icon name="playlist-edit" color={'#000'} size={50} />
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


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: '#000',
    borderRightWidth: 2,
    backgroundColor: '#DDB892',
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
  }

});



const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
