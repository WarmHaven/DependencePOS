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
import { Checkbox } from 'react-native-paper';
import { AuthContext, InfoContext, DataContext } from './Context';

const RemarkArea = ({ID}) =>{
  const { dataState, dataDispatch } = React.useContext(DataContext);
  // console.log(dataState.CART_LIST[ID]);
  const [selectedId, setSelectedId] = useState('0');
  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState({
    remarkType: [],
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
        }else{
        
          getRemarkType();
        }
        // console.log('user token: ', userToken);
        // dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 500);

      
  },[state.userToken]);

  async function getRemarkType(){
    if (state.userToken != null && dataState.REMARK_TYPE_LIST==null) {  
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

                setState({
                  ...state,
                  remarkType: allData.result
                });
                dataDispatch({type:'SET_REMARK_TYPE_LIST', remarkList: allData.result})


            }).catch((error) => {
              console.log(error);
              // alert("網路異常，請重新整理！");
            })


      
    }else{
      setState({
        ...state,
        remarkType: dataState.REMARK_TYPE_LIST
      });
    }
  }


  function RemarkList({data}) {

    // dataState.CART_LIST[ID].remark[index]

    const temp = dataState.CART_LIST.find((item) => item.id == ID);
    const listItems = data.map((item, index) =>
      <Item key={item.id} item={item} remarkData={temp.remark[index]} ID={ID} Index={index}/>
    );
    return (
      <View>
        {listItems}
      </View>
    );
  }

  // const renderItem = ({ item }) => {
  //   const backgroundColor = item.id === selectedId ? "#7F5539" : "#B08968";
  //   state.productType.map((data, index) =>({
  //     return (
  //       <Item
  //         item={item}
  //       />
  //     );
  //   }));
  // };


  if (state.userToken==null) {
    return(
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large"/>
      </SafeAreaView>

    );
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.row2}>
        <RemarkList data={state.remarkType} />
      </View>
    </SafeAreaView>
  ) 
};

export default RemarkArea;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: '#000',
    // borderRightWidth: 2,
    backgroundColor: '#f9f5ed',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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


const Item = ({ item, onPress, style, remarkData, ID, Index }) => {
  const { dataState, dataDispatch } = React.useContext(DataContext);
  // console.log(remarkData);
  const [checked, setChecked] = React.useState(remarkData===undefined ? false:remarkData);
  // console.log(checked);

  const test = ()=>{
    // setChecked(!checked);
    dataDispatch({type:'ADD_REMARK', active:checked, id:ID, index:Index });    
  }

  return(
    // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
       <Checkbox.Item
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => test()}
          label={item.title}
          labelStyle={{fontSize:30, fontWeight: 'bold', color: checked?  '#da7071' : '#dadada'}}
        />
    // </TouchableOpacity>
  )
};


