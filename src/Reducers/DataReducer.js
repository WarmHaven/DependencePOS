import React, { useEffect } from 'react';


export const initialDataState = {
  PRODUCT_TYPE: null,
  PRODUCT_LIST: null,
  DEFAULT_PROD_LIST: [],
  CART_LIST: [],
};


export const dataReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
        break;
      case 'SET_PRODUCT_TYPE': 
        return {
          ...prevState,
          PRODUCT_TYPE: action.productType,
        };
        break;
      case 'SET_PRODUCT_LIST': 
        return {
          ...prevState,
          PRODUCT_LIST: action.productList,
        };
        break;
      case 'SET_DEFAULT_PRODUCT_LIST': 
        return {
          ...prevState,
          DEFAULT_PROD_LIST: action.defaultProdList,
        };
        break;
      case 'ADD_CART_LIST': 
        const found = prevState.CART_LIST.find(e => e.id==action.cartList.id);
        if (found!=undefined) {
          found.count=found.count+action.cartList.count;
          found.totalPrice=found.count*found.price;

          const old = prevState.CART_LIST.findIndex(e => e.id==action.cartList.id);
          prevState.CART_LIST.splice(old,1);
          // prevState.CART_LIST.push(found); 
          return {
            ...prevState,
            CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), found],
          };

        }else{
          return {
            ...prevState,
            CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), action.cartList],
          };  
        }


        // console.warn(found.count, action.cartList.count);
        // console.warn(initialDataState.CART_LIST);
        // return {
        //   ...prevState,
        //   CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), action.cartList],
        // };
        break;
      case 'DELETE_CART_LIST': 
        // console.warn(action.id, ...prevState.CART_LIST.filter((item) => item.id !== action.id));
        return {
          ...prevState,
          CART_LIST: [...prevState.CART_LIST.filter((item) => item.id !== action.id)],
        };
        break;
      case 'REMOVE_ALL_CART_LIST': 
        // initialDataState.CART_LIST = initialDataState.CART_LIST.slice(0,0);
        // console.warn(initialDataState.CART_LIST);
        // shoutouts : state.shoutouts.filter( (item, index) => index !== action.index)
        return {
          ...prevState,
          CART_LIST: [...prevState.CART_LIST.slice(0,0)],
        };
        break;
      











    }
};