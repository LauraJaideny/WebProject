<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	require_once __DIR__ . '/dataLayer.php';
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);

	$action = $_POST["action"];

	switch($action)
	{
		case 'LOGIN':
			attemptLogin();
			break;
		case 'REGISTER':
			attemptRegister();
			break;
		case 'LOGOUT':
			attemptLogout();
			break;
		case 'INDEX':
			attemptIndex();
			break;
		case 'COOKIE':
			 attemptCookie();
			 break;
		case 'COMMENT':
			 attemptComment();
			 break;
		case 'POSTC':
			 attemptPost();
			 break;
		default:
			# code
			break;
	}

	function attemptLogin()
	{
		# Get username and password from POST.
		$uName = $_POST["uName"];
		//$uPassword = $_POST["uPassword"];
		
		# Try to login with the database.
		$result = dbLogin($uName);

		if($result["status"] == "SUCCESS")
		{
			$uPassword = decryptPassword($result["uPass"]);
			if($_POST["uPassword"] === $uPassword)
			{
				# Everything went okay.

				$rememberMe = $_POST["rememberMe"];

				if($rememberMe == "true")
				{
					setcookie("usernameWeb", "$uName", time()+3600*24*5);
				}

				session_start();

				$_SESSION["fName"]=$result["firstname"];
				$_SESSION["lName"]=$result["lastname"];
				$_SESSION["uName"]=$result["uName"];
				echo json_encode($result);
			}
			else
			{
				echo $uPassword;
				errorHandling("543");
			}
		}
		else
		{
			errorHandling($result["status"]);
		}
	}

	function attemptRegister()
	{
		# Get username and password from POST.
		$uName = $_POST["uName"];
		$uF = $_POST["uF"];
		$uL = $_POST["uL"];
		//$uPassword = $_POST["uPassword"];
		$email = $_POST["email"];

		$uPassword = encryptPassword();

		# Try to login with the database.
		$result = dbRegister($uName, $uPassword, $uL, $uF, $email);

		if($result["status"] == "SUCCESS")
		{
			# Everything went okay.

			session_start();

			$_SESSION["fName"]=$result["firstname"];
			$_SESSION["lName"]=$result["lastname"];
			$_SESSION["uName"]=$result["uName"];

			echo json_encode($result);
		}
		else
		{
			errorHandling($result["status"]);
		}
	}

	function encryptPassword()
	{
		$uPassword = $_POST["uPassword"];

		$key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $keySize =  strlen($key);
		
	    $ivSize = @mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = @mcrypt_create_iv($ivSize, MCRYPT_RAND);
	    
	    $cipher = @mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $uPassword, MCRYPT_MODE_CBC, $iv);
	    $cipher = $iv . $cipher;
		
		$uPassword = base64_encode($cipher);
		
		return $uPassword;
	}

	function decryptPassword($uPassword) {
		$key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $cipher = base64_decode($uPassword);
		
		$ivSize = @mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = substr($cipher, 0, $ivSize);
	    $cipher = substr($cipher, $ivSize);

	    $uPassword = @mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $cipher, MCRYPT_MODE_CBC, $iv);
	   	
	   	$uPassword = rtrim($uPassword, "\0");
	    return $uPassword;
	}

	# If a user wishes to logout.
	function attemptLogout()
	{
		session_start();
		session_destroy();
		$response = "Session closed";
		echo json_encode($response);
	}

	function attemptIndex()
	{
		session_start();
		if(isset($_SESSION["fName"]))
		{
			$response = array("firstname"=>$_SESSION["fName"], "lastname"=>$_SESSION["lName"]);
			echo json_encode($response);
		}
		else
		{
			errorHandling("500");
		}
	}

	function attemptCookie()
	{
		if(isset($_COOKIE["usernameWeb"]))
		{
			$response2 = $_COOKIE["usernameWeb"];
			echo json_encode($response2);
		}
		else
		{
			errorHandling("500");
		}
	}

	function attemptComment()
	{
		$result = dbComment();
		if(isset($result["status"]))
		{
			errorHandling("500");
		}
		else
		{
			echo json_encode($result);
		}

	}

	function attemptPost()
	{
		session_start();
		$uName = $_SESSION["uName"];
		$comment = $_POST["comment"];

		$result = dbPost($comment, $uName);

		if($result["status"] == "SUCCESS")
		{
			
			echo json_encode($result);
		}
		else
		{
			errorHandling("500");
		}
	}

	# If an error happens during a login.
	function errorHandling($errorCode)
	{
		#echo $errorCode;
		switch($errorCode)
		{

			case '500':
				header("HTTP/1.1 500 Bad connection, portal down");
				die("The server is down, we couldn't stablish the data base connection.");
				break;

			case '406':
				header("HTTP/1.1 406 User not found.");
				die("Wrong credentials provided.");
				break;
			case '501':
				header("HTTP/1.1 501 Bad connection, portal down");
				die("User could not be created.");
				break;
			case '409':
				header("HTTP/1.1 500 Bad connection, portal down");
				die("User already exists.");
				break;

			case '543':
				header("HTTP/1.1 500 Invalid password ");
				die("Invalid password");
				break;

			default:
				header("HTTP/1.1 500 Bad connection, portal down ");
				die("The server is down, we couldn't stablish the data base connectionnn.");
				break;

		}
	}

?>