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
		case 'GETSESSION':
			attemptGetSession();
			break;
		case 'COOKIE':
			 attemptCookie();
			 break;
		case 'GETPOSTS':
			 attemptGetPosts();
			 break;
		case 'GETREPLIES':
			 attemptGetReplies();
			 break;
		case 'ADDREPLY':
			 attemptAddReply();
			 break;
		case 'GETGALLERY':
			 attemptGetGallery();
			 break;
		case 'GETPOSTSU':
			 attemptGetPostsU();
			 break;
		case 'POST':
			 attemptPost();
			 break;
		case 'EDIT':
			 attemptEdit();
			 break;
		case 'DELETEP':
			 attemptDelete();
			 break;
		case 'STARTSESSION':
			attemptStartSession();
			break;
		case 'ADDFAVORITE':
			attemptFavorite();
			break;
		case 'GETFAVORITES':
			attemptGetFavorites();
			break;
		case 'DELETEFAVORITE';
			attemptDeleteFavorite();
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
		echo json_encode(array('success'=>'Session deleted')); 
	}

	function attemptGetSession()
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
			echo json_encode(array("cookieUserName" => $_COOKIE["usernameWeb"]));
		}
		else
		{
			errorHandling("411");
		}
	}

	function attemptStartSession(){
		$username = $_POST["username"];
		$password = $_POST["password"];

		$result = dbLogin($username, $password);

		if($result["status"] == "SUCCESS"){

			session_start();
			$_SESSION["fName"]=$result["firstname"];
			$_SESSION["lName"]=$result["lastname"];
			$_SESSION["uName"]=$result["uName"];

			echo json_encode(array('success'=>'Session started with new user'));
		}
		else{
			errorHandling($result["status"]);
		}
	}

	function attemptGetPosts()
	{
		$result = dbGetPosts();
		if(isset($result["status"]))
		{
			errorHandling("500");
		}
		else
		{
			echo json_encode($result);
		}

	}

	function attemptGetReplies()
	{
		$idPost = $_POST["idPost"];
		$result = dbGetReplies($idPost);
		if(isset($result["status"]))
		{
			errorHandling("500");
		}
		else
		{
			echo json_encode($result);
		}

	}

	function attemptGetPostsU()
	{
		session_start();
		$uName = $_SESSION["uName"];
		$result = dbGetPostsU($uName);
		if(isset($result["status"]))
		{
			errorHandling("500");
		}
		else
		{
			echo json_encode($result);
		}

	}

	function attemptGetGallery()
	{
		$result = dbGetGallery();
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

	function attemptEdit()
	{
		session_start();
		$uName = $_SESSION["uName"];
		$comment = $_POST["comment"];
		$idPost = $_POST["idPost"];

		$result = dbUpdate($comment, $idPost);

		if($result["status"] == "SUCCESS")
		{
			
			echo json_encode($result);
		}
		else
		{
			errorHandling("500");
		}
	}

	function attemptAddReply()
	{
		session_start();
		$uName = $_SESSION["uName"];
		$reply = $_POST["reply"];
		$idPost = $_POST["idPost"];

		$result = dbAddReply($reply, $idPost, $uName);

		if($result["status"] == "SUCCESS")
		{
			
			echo json_encode($result);
		}
		else
		{
			errorHandling("500");
		}
	}


	function attemptFavorite(){
		session_start();
		$uName = $_SESSION["uName"];
		$idPost = $_POST["idPost"];

		$result = dbAddFavorite($uName, $idPost);

		if($result["status"] == 'SUCCESS') {
			echo json_encode(array('success'=>'Favorite added'));
		}
		else {
			errorHandling($result["status"]);
		}
	}

	function attemptGetFavorites(){
		session_start();
		$uName = $_SESSION["uName"];

		$result = dbGetFavorites($uName);

		if(isset($result["status"])) {
			errorHandling("500");
		}
		else {
			echo json_encode($result);
		}
	}

	function attemptDeleteFavorite(){
		$idPost = $_POST["idPost"];

		$result = dbDeleteFavorite($idPost);

		if($result["status"] == "SUCCESS") {
			
			echo json_encode($result);
		}
		else {
			errorHandling($result["status"]);

		}
	}

	function attemptDelete()
	{
		$idPost = $_POST["idPost"];

		$result = dbDelete($idPost);

		if($result["status"] == "SUCCESS")
		{
			
			echo json_encode($result);
		}
		else
		{
			errorHandling($result["status"]);

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
				header("HTTP/1.1 500 User already exist");
				die("User already exists.");
				break;
			case '411':
				header("HTTP/1.1 411 Cookie not set yet");
				die("Cookie not set yet");
				break;
			case '413':
				header("HTTP/1.1 413 Not success received in getting favorites");
				die("Not success received in getting favorites");
				break;
			case '414':
				header("HTTP/1.1 414 Not success in deleting from favorites");
				die("Not success in deleting from favorites");
				break;
			case '415':
				header("HTTP/1.1 415 This post was added previously to favorites");
				die("This post was added previously to favorites");
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
