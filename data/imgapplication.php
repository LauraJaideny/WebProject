<?php
	//header('Content-type: application/json');
	//header('Accept: application/json');
	require_once __DIR__ . '/dataLayer.php';
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);


		session_start();
		$uName = $_SESSION["uName"];

		if(isset($_FILES["file"]["type"]))
		{
			$validextensions = array("jpeg", "jpg", "png");
			$temporary = explode(".", $_FILES["file"]["name"]);
			$file_extension = end($temporary);
			if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $validextensions)) {
				if ($_FILES["file"]["error"] > 0)
				{
					echo json_encode($_FILES["file"]["error"]) ;
				}
				else
				{
					if (file_exists("../images/" . $_FILES["file"]["name"])) {
						echo json_encode("already exists");
					}
					else
					{
						$sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
						$imageName = $_FILES["file"]["name"];

						$result = dbUploadImage($uName, $imageName);

						$targetPath = "../images/".$_FILES['file']['name']; // Target path where file is to be stored
						move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
						echo json_encode($result);
					}
				}
			}
			else
			{
			errorHandling("417");
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
			case '416':
				header("HTTP/1.1 416 Not images to be loaded");
				die("Not images to be loaded");
				break;
			case '417':
				header("HTTP/1.1 417 The image could not be uploaded");
				die("The image could not be uploaded");
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
