<?php


// require_once("config.php");
date_default_timezone_set("Asia/Taipei");
header("Content-Type:text/html; charset=utf-8");
require_once 'AllFunction.php';
require_once 'PRODUCT.php';

require "./JWT/JWT.php";






// $method_name = $_POST['METHOD_NAME'];
// $account = $_POST['ACCOUNT'];
// $password = $_POST['PASSWD'];
	$jwt = new App\JWT();
	$obj = new AllFunction();

	$method_name = !empty($_POST['METHOD_NAME'])? $_POST['METHOD_NAME']:'null';
	$token = !empty($_POST['apiKey'])? $_POST['apiKey']:'null';


	if ($method_name != 'loginCheck') {
		$jwtResult = authJWT();
		if ($jwtResult['code'] != 0) {
			// print_r($jwtResult);
			echo json_encode($jwtResult);
			die();
		}
	}
	

	switch ($method_name) {
		case 'loginCheck':
			$account = !empty($_POST['ACCOUNT'])? $_POST['ACCOUNT']:'null';
			$password = !empty($_POST['PASSWD'])? $_POST['PASSWD']:'null';
			$name = $obj-> loginCheck($account, $password);
			// echo json_encode($result);
			// echo json_encode($result) != 'null';

			if( $name != null){
				$token = $jwt->getToken($name);
				// echo $token;
				$result = array("code"=>1, "result"=>$name, "token"=>$token);
				echo( json_encode($result));
			}else{
				// $content=str_replace("\n","","帳號或密碼錯誤");

				$result = array("code"=>-1, "result"=>"帳號或密碼錯誤", "token"=>null);
				echo( json_encode($result));
			}
			
			break;
		case 'insertOrder':
			$cartList = !empty($_POST['cartList'])? json_decode($_POST['cartList']):'null';
			$orderList = !empty($_POST['orderList'])? $_POST['orderList']:'null';
			$result = array("code"=>0, "result"=>"新增訂單與訂單明細 成功");

			//建立新訂單
			$createOrderResult = $obj-> createNewOrder($orderList);

			// print_r($createOrderResult);
			// print_r($cartList);
			if ($createOrderResult['result'] != '') {
				for ($i=0; $i < count($cartList) ; $i++) { 
					//確認訂單有無建立成功
					if ($createOrderResult['code']==-1) {
						$result = array("code"=>-1, "result"=>"新增訂單錯誤: ".$createOrderResult['result']);
						break;
					}
					//新增明細
					$insertItemResult = $obj-> insertNewOrder_items($createOrderResult['result'], $cartList[$i]);
					if ($insertItemResult['code'] == -1) {
						$result = array("code"=>-1, "result"=>"新增明細錯誤: ".$insertItemResult['result']);
						//刪除 新訂單
						$obj->deleteOrder($createOrderResult['result']);
						break;
					}
				}
			}
			echo( json_encode($result));
			break;
		case 'getUndoneOrder':
			$data = $obj-> getUndoneOrder();
			$orderno = null;
			
			$orderMenuList = array();
			$orderItemsList = array();
			$outputList = array();
			// print_r($data);count

			if ($data != null) {
				for ($i=0; $i < count($data); $i++) { 
					if ($orderno != $data[$i]['OrderNO']) {
						$orderno = $data[$i]['OrderNO'];
						$newDate = $data[$i]['CreateDate'];
						// $newDate = date("H:i:s", strtotime($newDate));

						$temp = array('OrderNo' => $data[$i]['OrderNO'], 'TotalPrice' => $data[$i]['TotalPrice'], 'Count' => $data[$i]['Count'], 'Discount' => $data[$i]['Discount'], 'CreateDate' => $newDate);
						$orderList = array();
						$itemList = array();
						array_push($orderList, $temp);
						array_push($orderMenuList, $temp);
					}

					$temp = array('prodName' => $data[$i]['Name'], 'unitPrice' => $data[$i]['UnitPrice'], 'Quantity' => $data[$i]['Quantity'], 'Remark' => json_decode($data[$i]['Remark']), 'remark_plus' => $data[$i]['Remark_plus'], 'remark_minus' => $data[$i]['Remark_minus']);
					array_push($itemList, $temp);
					
					if ( $i+1 != count($data) ) {
						if ($data[$i]['OrderNO'] != $data[$i+1]['OrderNO']) {
							array_push($orderItemsList, array("Main"=>$orderList, "Items"=>$itemList, ));
						}
					}else{
						array_push($orderItemsList, array("Main"=>$orderList, "Items"=>$itemList, ));
					}
					
				}

				array_push($outputList, array("OrderMenu"=>$orderMenuList, "OrderItems"=>$orderItemsList, ));
				// print_r(json_encode($outputList));
				$result = array("code"=>1, "result"=>$outputList, );
				echo( json_encode($result));

			}else{
				$result = array("code"=>-1, "result"=>"getUndoneOrder ERROR get data is null",);
				echo( json_encode($result));
			}	
			break;
		case 'doneOrder':
			$orderNo = !empty($_POST['orderNo'])? $_POST['orderNo']:'null';
			$result = array("code"=>0, "result"=>"完成訂單 成功");

			if ($orderNo != '') {
				//完成訂單
				$doneOrderResult = $obj-> updateOrder($orderNo,2);
				if ($doneOrderResult['code']==-1) {
					$result = array("code"=>-1, "result"=>"完成訂單錯誤: ".$doneOrderResult['result']);
					// break;
				}
			}
			echo( json_encode($result));
			break;
		case 'cancelOrder':
			$orderNo = !empty($_POST['orderNo'])? $_POST['orderNo']:'null';
			$result = array("code"=>0, "result"=>"取消訂單 成功");

			if ($orderNo != '') {
				//取消訂單
				$doneOrderResult = $obj-> updateOrder($orderNo,3);
				if ($doneOrderResult['code']==-1) {
					$result = array("code"=>-1, "result"=>"取消訂單錯誤: ".$doneOrderResult['result']);
					// break;
				}
			}
			echo( json_encode($result));
			break;
		case 'getProduct':
			$type = !empty($_POST['TYPE'])? $_POST['TYPE']:0;
			$product = new PRODUCT();
			$data = $product->$type;


			$productList = array();
			if ($data != null) {
				for ($i=0; $i < count($data); $i++) { 
					$temp = array('ID' => $data[$i]['ID'], 'NAME' => $data[$i]['Name'], 'unitPRICE' => $data[$i]['UnitPrice'], 'color' => stateToColor($data[$i]['State']), 'TYPE'=>$data[$i]['Type']);
					array_push($productList, $temp);
				}

				$result = array("code"=>1, "result"=>$productList, );
				echo( json_encode($result));

			}else{
				$result = array("code"=>-1, "result"=>"getProduct ERROR get data is null",);
				echo( json_encode($result));
			}	
			break;
		case 'getProductType':
			$data = $obj-> getProductType();
			$productList = array();
			if ($data != null) {
				for ($i=0; $i < count($data); $i++) { 
					$temp = array('id' => $data[$i]['ID'], 'title' => $data[$i]['Name']);
					array_push($productList, $temp);
				}

				$result = array("code"=>1, "result"=>$productList, );
				echo( json_encode($result));

			}else{
				$result = array("code"=>-1, "result"=>"getProductType ERROR get data is null",);
				echo( json_encode($result));
			}	
			break;
		case 'getRemarkType':

			$data = $obj-> getRemarkType();
			$remarkList = array();
			if ($data != null) {
				for ($i=0; $i < count($data); $i++) { 
					$temp = array('id' => $data[$i]['ID'], 'title' => $data[$i]['Name']);
					array_push($remarkList, $temp);
				}

				$result = array("code"=>1, "result"=>$remarkList, );
				echo( json_encode($result));

			}else{
				$result = array("code"=>-1, "result"=>"getRemarkType ERROR get data is null",);
				echo( json_encode($result));
			}	
			
			break;
		case 'getCompany':		
			$data = $obj-> getCompany();
			$companyList = array();
			$valueList = array();


			if ($data != null) {
				for ($i=0; $i < count($data); $i++) { 
					$value = array();
					$value = array('phone' => $data[$i]['phoneNum'], 'mail' => $data[$i]['mail'], 'line' => $data[$i]['lineID']);
					array_push($valueList, $value);


					$temp = array('label' => $data[$i]['name'], 'value' => json_encode($valueList), );
					array_push($companyList, $temp);
				}

				$result = array("code"=>1, "result"=>$companyList, );
				echo( json_encode($result));

			}else{
				$result = array("code"=>-1, "result"=>"getCompany ERROR get data is null",);
				echo( json_encode($result));
			}	



			break;

		default:
			echo 'No find this Function -> '.$method_name;
			break;
	}




function authJWT(){
	$jwt = new App\JWT();
	if (!isset($_POST['apiKey'])) {
		$result = array("code"=> -99, "msg"=>"非法驗證！");
		// return $result;
		// die();
	}else{

		$token = $_POST['apiKey'];
		$verification = $jwt->verifyToken($token);
		// echo $verification;

		switch ($verification) {
			case 1:
				$result = array("code"=>-1, "result"=>"NO apiKEY");
				break;
			case 2:
				$result = array("code"=>-2, "result"=>"Encode apiKEY ERROR -> 2");
				break;
			case 3:
				$result = array("code"=>-3, "result"=>"Encode apiKEY ERROR -> 3");
				break;
			case 4:
				$result = array("code"=>-4, "result"=>"apiKEY Time Out");
				break;
			case 5:
				$result = array("code"=>-5, "result"=>"apiKEY is ERROR");
				break;
			case 0:
				$result = array("code"=>0, "result"=>"apiKEY SUCCESS");
				// return json_encode($result);
				break;
			default:
				
				break;
		}


	}
	return $result;
}


function stateToColor($states){
	switch ($states) {
		case 0:
			return "#000000";
			break;
		case 1:
			return "#005AB5";
			break;
		case 2:
			return "#FF5151";
			break;
		default:
			# code...
			break;
	}
}
















?>