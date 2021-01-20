import React, { useEffect } from 'react';


export const initialDataState = {
  //product
  PRODUCT_TYPE: null,
  PRODUCT_LIST: null,
  DEFAULT_PROD_LIST: [],

  //cart
  CART_LIST: [],

  //order
  ORDER_COUNT: 0,
  ORDER_PRICE: 0,
  DISCOUNT_VALUE: 0,

  //temp
  DISCOUNT: '',
  REMARK_TYPE_LIST: null,
};


export const dataReducer = (prevState, action) => {

    function getTotal(item) {
      var c=0, p=0;
      for (var i = 0; i < item.length; i++) {
        c = c + item[i].count;
        p = p + item[i].totalPrice+parseInt(item[i].plus==''? 0:item[i].plus)-parseInt(item[i].minus==''? 0:item[i].minus);
      }
      // console.warn(c,p);
      const result = [{"count":c, "price":p}];
      return(result);
    }


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
          found.totalPrice=found.count*found.unitPrice;

          const old = prevState.CART_LIST.findIndex(e => e.id==action.cartList.id);
          prevState.CART_LIST.splice(old,1,found);
          // prevState.CART_LIST.push(found); 
          var total = getTotal(prevState.CART_LIST)[0];
          return {
            ...prevState,
            ORDER_COUNT: total.count,
            ORDER_PRICE: total.price,
            // CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), found],
          };

        }else{
          var total = getTotal([...prevState.CART_LIST, action.cartList])[0];
          return {
            ...prevState,
            // CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), action.cartList],
            CART_LIST: [...prevState.CART_LIST, action.cartList],
            ORDER_COUNT: total.count,
            ORDER_PRICE: total.price,
          };  
        }
        break;
      case 'DELETE_CART_LIST': 
        var total = getTotal([...prevState.CART_LIST.filter((item) => item.id !== action.id)])[0];
        return {
          ...prevState,
          CART_LIST: [...prevState.CART_LIST.filter((item) => item.id !== action.id)],
          ORDER_COUNT: total.count,
          ORDER_PRICE: total.price,
        };
        break;
      case 'REMOVE_ALL_CART_LIST': 
        return {
          ...prevState,
          CART_LIST: [...prevState.CART_LIST.slice(0,0)],
          ORDER_COUNT: 0,
          ORDER_PRICE: 0,
        };
        break;
      case 'SET_REMARK_TYPE_LIST': 
        return {
          ...prevState,
          REMARK_TYPE_LIST: action.remarkList,
        };
        break;
      case 'ADD_REMARK': 
        const found2 = prevState.CART_LIST.find((item) => item.id == action.id);
        found2.remark[action.index] = !action.active;

        const old2 = prevState.CART_LIST.findIndex(e => e.id==action.id);
        // prevState.CART_LIST.splice(old2,1);


        prevState.CART_LIST.splice(old2,1,found2);
        // const t = prevState.CART_LIST.splice(old2,1,found2);
        // console.log(t);


        return {
          ...prevState,
          // CART_LIST: [...prevState.CART_LIST.filter( id => id !== action.id), found2],
          // CART_LIST: [...prevState.CART_LIST.splice(old2,1,found2)]
        };
        break;
      case 'SET_REMARK_PLUS': 

        var old3 = prevState.CART_LIST.findIndex(e => e.id==action.id);
        var found3 = prevState.CART_LIST.find((item) => item.id == action.id);
        found3.plus = action.value;

        prevState.CART_LIST.splice(old3,1,found3);
        var total = getTotal(prevState.CART_LIST)[0];
        return {
          ...prevState, 
          ORDER_PRICE: total.price,         
        };
        break;
      case 'SET_REMARK_MINUS': 

        old3 = prevState.CART_LIST.findIndex(e => e.id==action.id);
        found3 = prevState.CART_LIST.find((item) => item.id == action.id);
        found3.minus = action.value;

        prevState.CART_LIST.splice(old3,1,found3);

        var total = getTotal(prevState.CART_LIST)[0];
        return {
          ...prevState,
          ORDER_PRICE: total.price,
        };
        break;
      case 'RESET_DISCOUNT': 

        return {
          ...prevState,
          DISCOUNT: '',
          DISCOUNT_VALUE : 0,
        };
        break;
      case 'SET_DISCOUNT': 
        var discount = 0;
        if (action.mode==1) {
          
          if (action.discount.length>1) {
            discount = prevState.ORDER_PRICE*(100-action.discount)/100
          }else if (action.discount.length==1) {
            discount = prevState.ORDER_PRICE*(10-action.discount)/10
          }
        }else{
          discount = action.discount;
        }
        if (action.discount.length==0) { discount = 0; }

        return {
          ...prevState,
          DISCOUNT: action.discount,
          DISCOUNT_VALUE : parseInt(discount),
        };
        break;








    }
};