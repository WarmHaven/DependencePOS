import React, { useEffect } from 'react';
import {
	View, 
	Text, 
	ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import { DataContext } from './Context';


const ProdButton = ({item, time}) => {
	const { dataState, dataDispatch } = React.useContext(DataContext);
	const [count, setCount] = React.useState(0);
	
	function itemInfo(item, count) {
		var itemList = { id: item.ID, name: item.NAME, price: item.PRICE, count: count, totalPrice: item.PRICE*count, remark: [], plus:'', minus: '' };
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
			            <View style={[styles.homeButton, {backgroundColor: '#9C6644'}]}>

			                <Text style={styles.buttonTextStyle}>
			                    NO. {item.ID}
			                </Text>
			                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]} >
			                    {item.NAME}
			                </Text>
			                <Text style={[ styles.buttonTextStyle, {textAlign: 'center'} ]}>
			                    {item.PRICE}
			                </Text>
			            </View>
			        </TouchableOpacity>
		        	<View style={styles.calContainer}>
		                <View style={[styles.row, {justifyContent: 'space-between'}]}>
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

		    <View style={[styles.row, {height: '60%'}]}>
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
        		<View style={styles.row}>
					{AllBadge}
				</View>
    		</ScrollView>
		);
		
	}

		

};

export default ViewProductArea;

var SCREEN_HEIGHT = Dimensions.get('window').height;
var SCREEN_WIDTH = Dimensions.get('window').width;
// var SCREEN_WIDTH = 1900;
var SCROLL_HEIGHT = SCREEN_HEIGHT;
var SCROLL_WIDTH = SCREEN_WIDTH;
var cols = 6.5;
    // // console.log(SCREEN_WIDTH);
    // if (SCREEN_WIDTH >= 1024) {
    //     // var boxW = 180;
    //     var cols = 8;
    // } else if (SCREEN_WIDTH >= 768) {
    //     var boxW = 95;
    //     var cols = 7;
    // } else if (SCREEN_WIDTH >= 600) {
    //     var boxW = 95;
    //     var cols = 6;
    //     var TEXT_SIZE = 18;
    // } else {

    //     var boxW = 70;
    //     var cols = 5;
    //     var TEXT_SIZE = 12;
    // }
var boxW = 170;

var hMargin = 20;
var wMargin = (SCREEN_WIDTH - cols * boxW) / (cols + 1);
wMargin=12;


const styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6c6c6c',
    },
    row: {
        // width: SCREEN_WIDTH,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column: {
        // flex: 1,
        flexDirection: 'column',

    },
    buttonTextStyle: {

    	color: '#000',
    	fontSize: 20,

    },
    btnCount: {

    	color: '#000',
    	fontSize: 18,
    	marginHorizontal: 5

    },

    homeButton: {

        backgroundColor:'gray',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: boxW,
        height: boxW,
        // marginLeft: wMargin, 
        // marginBottom: hMargin,
        paddingVertical: 20,
        borderRadius: 10,
    },
    btnContainer: {
    	marginLeft: wMargin, 
    },
    calContainer :{
    	marginBottom: hMargin,
    	backgroundColor: '#fff',
    	borderRadius: 10,
    },

    detailStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    scrollStyle: {
        height: SCROLL_HEIGHT,
        width: '100%',
        marginVertical: '8%',


    },

    

    



});