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
import { AuthContext, InfoContext, DataContext } from './Context';

const CartListScroll = ({auth}) =>{
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedId, setSelectedId] = useState('0');
  const [state, setState] = React.useState({
    userToken: null,
    userName: null
  });

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
          getTotal(dataState.CART_LIST);
        }else{
          getTotal(dataState.CART_LIST);
        }
        // console.log('user token: ', userToken);
        // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 500);

      
  },[state.userToken, dataState.CART_LIST]);


  function getTotal(item) {
    var c=0, p=0;
    for (var i = 0; i < item.length; i++) {
      c = c + item[i].count;
      p = p + item[i].totalPrice;
    }
    // console.warn(c,p);
    setCount(c);
    setTotalPrice(p);
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

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#7F5539" : "#B08968";
    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.id), dataDispatch({type: 'DELETE_CART_LIST', id: item.id})]}
        style={{ backgroundColor }}
      />
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
        extraData={selectedId}
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

});



const Item = ({ item, onPress, style }) => (
  
    <View style={[styles.row, styles.item, style]}>
      <View style={styles.nameArea}>
        <Text style={styles.title}>No.{item.id}  {item.name}</Text>
      </View>
      <View style={styles.countArea}>
        <Text style={styles.title}>{item.count}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.title}>{item.price}</Text>
      </View>
      <View style={styles.priceArea}>
        <Text style={styles.title}>{item.totalPrice}</Text>
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
}
