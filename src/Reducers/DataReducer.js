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
      case 'SET_PRODUCT_TYPE': 
        // console.log('set..');
        return {
          ...prevState,
          PRODUCT_TYPE: action.productType,
        };
      case 'SET_PRODUCT_LIST': 
        // console.log('set..');
        return {
          ...prevState,
          PRODUCT_LIST: action.productList,
        };
      case 'SET_DEFAULT_PRODUCT_LIST': 
        // console.log('set..');
        return {
          ...prevState,
          DEFAULT_PROD_LIST: action.defaultProdList,
        };










    }
};