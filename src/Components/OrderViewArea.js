import React, { useEffect } from 'react';
import {
	View, 
	ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useTheme, Text, } from 'react-native-paper';
import { styles } from '../style/css';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import { DataContext } from './Context';


const OrderButton = ({item}) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	const paperTheme = useTheme();
  	const { myColor } = paperTheme;
	// console.log(item);

	var time=0;
	var AllBadge =  null || item.map( (item, index) => {
		// console.log(item, time);
		time+=300;
		return(
			<Animatable.View key={item.prodName} animation="fadeInLeft" duration={time}>
				<View style={styles.orderContainer}>
					<TouchableOpacity  onPress={ () => {}}>
			            <View style={[styles.orderButton, styles.row, {backgroundColor: myColor.button}]}>
			            	<View style={[styles.row, {justifyContent: 'flex-start', width: '40%'}]}>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center',marginRight:30} ]} >
				                   {item.prodName}    
				                </Text>
				                <Remark item={item} />
				            </View>
			                <View style={[styles.row, {justifyContent: 'space-between', width: '20%'}]}>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
				                    {item.Quantity}
				                </Text>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
				                    ${(item.Quantity * item.unitPrice)+parseInt(item.remark_plus==''? 0:item.remark_plus)-parseInt(item.remark_minus==''? 0:item.remark_minus)}
				                </Text>
				            </View>
			            </View>
			        </TouchableOpacity>
		        </View>
	        </Animatable.View>
		);
		
	})

	return(
		<View>		
			{AllBadge}
		</View>
	)
}

const DiscountButton = ({item}) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	const paperTheme = useTheme();
  	const { myColor } = paperTheme;

  	var discountTitle = 100-(item[0].Discount*100/item[0].TotalPrice);

	var AllBadge =  null || item.map( (item, index) => {
		return(
			<Animatable.View key={'D'+item.prodName} animation="fadeInLeft" >
				<View style={styles.orderContainer}>
					<TouchableOpacity  onPress={ () => {}}>
			            <View style={[styles.orderButton, styles.row, {backgroundColor: myColor.button}]}>
			            	<View style={[styles.row, {justifyContent: 'flex-start', width: '40%'}]}>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center',marginRight:30} ]} >
				                      {discountTitle}折
				                </Text>
				            </View>
			                <View style={[styles.row, {justifyContent: 'space-between', width: '20%'}]}>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
				                    1
				                </Text>
				                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
				                    -${item.Discount}
				                </Text>
				            </View>
			            </View>
			        </TouchableOpacity>
		        </View>
	        </Animatable.View>
		);
		
	})
	if (discountTitle == 100) {
		return(
			<View>		
			</View>
		)
	}
	return(
		<View>		
			{AllBadge}
		</View>
	)
}


const OrderViewArea = (props) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	// console.log(dataState);
	const [state, setState] = React.useState({
		data: null,
	});

	useEffect(() => {
	  	setState({
	  		data: dataState.CURRENT_ORDER[0],
	  	})
	},[dataState.CURRENT_ORDER]);


	if (state.data == null) {
		return (

		    <View style={[styles.productAreaRow, {height: '60%'}]}>
				
		    </View>

		);
		
	}else{
		return(
			<ScrollView style={styles.orderItemScroll}>
				<OrderButton key={state.data.Main.OrderNo} item={state.data.Items} />
				<DiscountButton key={'D'+state.data.Main.OrderNo} item={state.data.Main} />
    		</ScrollView>
		);
		
	}

		

};

export default OrderViewArea;



const Remark = ({item}) =>{
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const remark = item.Remark.map((item, index) =>{
    // console.log(item, dataState.REMARK_TYPE_LIST[index].title)
    if (item===true) {
      return(
        dataState.REMARK_TYPE_LIST[index].title+'、'
      )
    }
  });

  return(
    <Text style={styles.remark}>
      {item.remark_plus!='0'? '+$'+item.remark_plus+'、':null}
      {item.remark_minus!='0'? '-$'+item.remark_minus+'、':null}
      {remark}
      
    </Text>
  )
};
