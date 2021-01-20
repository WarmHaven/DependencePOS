import { StyleSheet, Dimensions } from 'react-native';

var SCREEN_HEIGHT = Dimensions.get('window').height;
var SCREEN_WIDTH = Dimensions.get('window').width;
// var SCREEN_WIDTH = 1900;
var SCROLL_HEIGHT = SCREEN_HEIGHT;
var SCROLL_WIDTH = SCREEN_WIDTH;
var cols = 5;
var boxW = 170;

var hMargin = 15;
var wMargin = (SCREEN_WIDTH - cols * boxW) / (cols + 1);
wMargin=15;



export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection:'row',
  },
  column: {
    flexDirection: 'column',
  },


  // Home
  cart: {
    padding: 10, 
    borderWidth: 4, 
    borderRadius: 99,
  },
  badge:{ 
    position: 'absolute',
  },
  menuArea:{
    width: '20%',
  },
  mainArea:{
    width: '80%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cartContainer:{
    alignSelf: 'flex-end', 
    marginRight: 20, 
    marginBottom: 10, 
    position: 'absolute',
    right: 5,
    bottom: 5,
  },

  //MenuScroll
  MenuScrollContainer:{
    flex: 1,
    borderRightWidth: 2,
  },
  item: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controlBar: {
    alignItems: 'flex-end'
  },
  // ProductArea
  productAreaRow: {
    // width: SCREEN_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnCount: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  prodButton: {
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
    borderRadius: 10,
  },
  scrollStyle: {
    height: SCROLL_HEIGHT,
    width: '100%',
    marginVertical: '5%',
  },

  //CartScreen
  table:{
    width: '90%',
    height: '80%',
  },
  tableBorder:{
    borderWidth: 2,
    // borderColor: '#000',
  },
  tableHeader: {
    backgroundColor: "#E0E0E0",
    padding: 20,
    // paddingLeft: 40,     
    alignItems: 'center',
    borderBottomWidth: 2,
    // marginVertical: 4,
  },
  tableHeaderText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  btnCancel:{
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  btnConfirm:{
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
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


  //CartListScroll
  footer:{
    width: '100%',
    padding: 10,   
    alignItems: 'center',
    borderColor: '#000',
    borderTopWidth: 2,
    height: 80
  },
  CartListText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  CartListItem: {
    padding: 20,
    // paddingLeft: 40,     
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 2,
    // marginVertical: 4,
  },
  totalCount:{
    width:'70%',
    alignItems: 'center',
    height: 60,
    justifyContent: 'space-between',
  },
  totalPrice:{
    width:'20%',
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  popover:{
    height: 500,
    width: 400,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#f9f5ed',
  },
  remark:{
    color: '#E0E0E0',
    fontSize: 20,
  },

  



  //Setting Sereen
  button: {
    alignItems: 'center',
    marginTop: 10,
    width: '20%'
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
    paddingVertical: 12,
    // paddingHorizontal: 16,
  },










});