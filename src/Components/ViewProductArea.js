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


const ProdButton = ({item, time}) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	const [count, setCount] = React.useState(0);

	const paperTheme = useTheme();
  	const { myColor } = paperTheme;

	function itemInfo(item, count) {
		var itemList = { id: item.ID, name: item.NAME, unitPrice: item.unitPRICE, count: count, totalPrice: item.unitPRICE*count, remark: [], plus:'', minus: '' };
		return itemList;
	}

	function ProdOnPress(item, count) {
		if (count==0) {
			Toast.show({
				type: 'error',
				text1: 'Add Product',
				text2: 'Product\'s count can not \'0\'!',
				visibilityTime: 1000,
		    });
		}else{
			dataDispatch({ type: 'ADD_CART_LIST', cartList: itemInfo(item,count) });
			setCount(0);

			Toast.show({
		      text1: 'Add Product - '+item.NAME+' ('+count+')',
		      text2: 'Success',
		      visibilityTime: 1000,
		    });
		}
	}

	return(
			<Animatable.View key={item.ID} animation="fadeInLeft" duration={time}>
				<View style={styles.btnContainer}>
					<TouchableOpacity  onPress={ () => ProdOnPress(item, count)}>
			            <View style={[styles.prodButton, {backgroundColor: myColor.button}]}>

			                <Text style={styles.buttonTextStyle}>
			                    NO. {item.ID}
			                </Text>
			                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
			                    {item.NAME}
			                </Text>
			                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]}>
			                    {item.unitPRICE}
			                </Text>
			            </View>
			        </TouchableOpacity>
		        	<View style={[styles.calContainer, {backgroundColor: myColor.button2}]}>
		                <View style={[styles.productAreaRow, {justifyContent: 'space-between'}]}>
				        	<TouchableOpacity onPress={() => count==0? null : setCount(count-1)}>
				          		<Icon name="minus" color={'#000'} size={40} />
				          	</TouchableOpacity>
				          	<Text style={[ styles.btnCount, {textAlign: 'center'} ]}>
			                    {count}
			                </Text>
				          	<TouchableOpacity onPress={() => count==10? null : setCount(count+1)}>
				          		<Icon name="plus" color={'#000'} size={40} />
				          	</TouchableOpacity>
				        </View>
		            </View>
		        </View>
	        </Animatable.View>


		
	)
}



const ViewProductArea = (props) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	const [state, setState] = React.useState({
		data: null,
	});

	useEffect(() => {
	  	
	},[dataState.PRODUCT_LIST]);


	if (dataState.PRODUCT_LIST == null) {
		return (

		    <View style={[styles.productAreaRow, {height: '60%'}]}>
				<TouchableOpacity  onPress={ () => console.log('test') }>
					<View style={{justifyContent:'center',alignItems:'center'}}>
			            <ActivityIndicator size="large"/>
		        		<Text>Loading..</Text>
		        	</View>
		        </TouchableOpacity>
		    </View>

		);
		
	}else{
		var time=0;
		var AllBadge =  dataState.PRODUCT_LIST.map( (item, index) => {
	    	// console.warn(item, index);

		    // var colorValue = parseInt(item.COLORCODE);
		      

		    // var R =  colorValue%256;
		    // var G =  (colorValue/256)%256;
		    // var B =  colorValue/(256*256);

		    // if (item.COLORCODE == 'null') {
		    //     var color = 'gray';
		    // }else{
		    //     var color = 'rgb('+R+','+G+','+B+')';
		    // }
		    // time= time+30;

			return(
				<ProdButton key={item.ID} item={item} time={0} />
			);
		})
		return(
			<ScrollView style={styles.scrollStyle}>
        		<View style={styles.productAreaRow}>
					{AllBadge}
				</View>
    		</ScrollView>
		);
		
	}

		

};

export default ViewProductArea;
