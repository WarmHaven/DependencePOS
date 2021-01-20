<?php


require_once("config.php");
// require "../JWT/JWT.php";


date_default_timezone_set("Asia/Taipei");
header("Content-Type:text/html; charset=utf-8");

class AllFunction{

	// public $ID ='0';
	// public $user = 'null';
	// public $sTime = 'null';
	// public $oTime =	'null';
	// public $todayDate = 'null';
	// public $oTotalSeconds = 0;
	// public $sTotalSeconds = 0;
	// public $nTotalSeconds = 0;
	// public $sameTime = array();
	// public $DateY='';
	// public $Date='';

	function AllFunction(){

		
	}

	function loginCheck($account, $password){
		global $pd;
		$pdo = $pd->getConnection();


		$sql = "SELECT * FROM USERINFO WHERE Account='".$account."' AND password='".$password."';";
		$result = $pdo->prepare($sql);
		$result->execute();
		$count = $result->fetchColumn();
		$output = array();



	    if ($count > 0 && $count != null) {
	    	

			if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
				$ip = $_SERVER["HTTP_CLIENT_IP"];
			} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
				$ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
			} else {
				$ip = $_SERVER["REMOTE_ADDR"];
			}

			try {
				$getID = $pdo->prepare("SELECT * FROM USERINFO WHERE Account='$account' AND password='$password'");
				$getID->execute(array(md5(uniqid()), '中文', '中文'));
				$result = $getID->fetch(PDO::FETCH_ASSOC);

				$name = $result['name'];

			} catch (PDOException $e) {
				echo "Error: " . $e->getMessage();
			}

			// $CustomerID = $result['CustomerID'];
			$_SESSION['account'] = $account;
			$_SESSION['password'] = $password;
			$date = date("Y-m-d H:i:s");
			try {

				$sql = "UPDATE USERINFO SET last_login='$date', ip='$ip'WHERE Account='$account' AND password='$password'";

				// Prepare statement
				$stmt = $pdo->prepare($sql);

				// execute the query
				$stmt->execute();
				// // echo a message to say the UPDATE succeeded
				// echo $stmt->rowCount() . " records UPDATED successfully";
			} catch (PDOException $e) {
				echo $sql . "<br>" . $e->getMessage();
			}

			try {

				$sql = "select used from USERINFO WHERE Account='$account';";

				// Prepare statement
				$stmt = $pdo->prepare($sql);

				// execute the query
				$stmt->execute(array(md5(uniqid()), '中文', '中文'));
				// // echo a message to say the UPDATE succeeded
				// echo $stmt->rowCount() . " records UPDATED successfully";
				while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$used = $result['used'];
				}
				// echo $used;
			} catch (PDOException $e) {
				echo $sql . "<br>" . $e->getMessage();
			}

			if ($used == 1) {				

				// $_SESSION['user_name'] = $name;
				// echo "<script>alert('登入成功');window.location = '../index.php';</script>";
				$output = $name;


			} elseif ($used == 2) {
				echo "此帳號尚未開通，請收到Mail通知再進行登入";
			} elseif ($used == 3) {
				echo "此帳號申請程序有誤，請重新申請";
			}

		} else {
			$output = null;
		}




		return $output;

	}

	function getBeansList(){
		global $pd;
		$pdo = $pd->getConnection();


		$select = "SELECT * FROM CoffeeBeansList;";
		$result = $pdo->query($select);

		$output = array();


		foreach ($result as $value) {
            // print_r($value['oTime']);
            
            array_push($output, $value);
            
        }


        return $output;


	}


	function getProduct(){



		global $pd;
		$pdo = $pd->getConnection();

		$output = array();

		$select = "SELECT * FROM PRODUCT;";
		
		try {
			$get = $pdo->prepare($select);
			$get->execute(array(md5(uniqid()), '中文', '中文'));
			$rows = $get->fetchAll(PDO::FETCH_ASSOC);

			// print_r($rows);

		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}


        return $rows;
	}
	function createNewOrder($OrderList){

		// echo "list: " . $cartList;
		$list = json_decode($OrderList)[0];
		// print_r($list);
		// for ($i=0; $i<count($list) ; $i++) { 
		// 	print_r($list[$i]->name);
		// }

		global $pd;
		$pdo = $pd->getConnection();

		$output = array();

		$insertSQL = "CALL CreateNewOrder('AA', 'ORDERS', $list->count, $list->discount, $list->totalPrice, @result); ";
		
		try {
			$get = $pdo->query($insertSQL);
			$rows = $get->fetchAll(PDO::FETCH_ASSOC);
			if ($rows[0]['newOrderNo']=='') {
				$result = array("code"=>-1, "result"=>'insertSQL ERROR');
			}else{
				$result = array("code"=>0, "result"=>$rows[0]['newOrderNo']);
			}
		} catch (PDOException $e) {
			// echo "Error: " . $e->getMessage();
			$result = array("code"=>-1, "result"=>$e->getMessage());
		}

        return $result;
	}
	function deleteOrder($orderNo){
		global $pd;
		$pdo = $pd->getConnection();

		$deleteSQL = "DELETE FROM ORDERS WHERE orderNo='$orderNo';";


		try {
			$get = $pdo->exec($deleteSQL);
			$result = array("code"=>0, "result"=>"OK");
		} catch (PDOException $e) {
			$result = array("code"=>-1, "result"=>$e->getMessage());
		}

        return $result;
	}

	function insertNewOrder_items($orderno,$itemList){
		global $pd;
		$pdo = $pd->getConnection();

		$output = array();
		$remark = json_encode($itemList->remark);

		$plus = ($itemList->plus =='')? 0:$itemList->plus;
		$minus = ($itemList->minus =='')? 0:$itemList->minus;

		$insertSQL = "INSERT INTO ORDER_ITEMS (OrderNo, ProductID, unitPrice, Quantity, Remark, Remark_plus, Remark_minus) VALUES ( '$orderno', '$itemList->id', $itemList->unitPrice, $itemList->count, 
			'$remark', $plus, $minus )";
		
		try {
			$get = $pdo->exec($insertSQL);
			$result = array("code"=>0, "result"=>"OK");
			
		} catch (PDOException $e) {
			// echo "Error: " . $e->getMessage();
			$result = array("code"=>-1, "result"=>$e->getMessage());
		}

		return $result;
	}

	function getProductType(){

		global $pd;
		$pdo = $pd->getConnection();

		$output = array();

		$select = "SELECT * FROM PRODUCT_TYPE;";
		
		try {
			$get = $pdo->prepare($select);
			$get->execute(array(md5(uniqid()), '中文', '中文'));
			$rows = $get->fetchAll(PDO::FETCH_ASSOC);

			// print_r($rows);

		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}


        return $rows;
	}

	function getRemarkType(){

		global $pd;
		$pdo = $pd->getConnection();

		$output = array();

		$select = "SELECT * FROM REMARK_TYPE;";
		
		try {
			$get = $pdo->prepare($select);
			$get->execute(array(md5(uniqid()), '中文', '中文'));
			$rows = $get->fetchAll(PDO::FETCH_ASSOC);

			// print_r($rows);

		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}


        return $rows;
	}


	function getCompany(){



		global $pd;
		$pdo = $pd->getConnection();

		$output = array();

		$select = "SELECT * FROM COMPANY;";
		
		try {
			$get = $pdo->prepare($select);
			$get->execute(array(md5(uniqid()), '中文', '中文'));
			$rows = $get->fetchAll(PDO::FETCH_ASSOC);

			// print_r($rows);

		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}


        return $rows;
	}












}









?>