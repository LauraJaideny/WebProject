<?php
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);

	function connectionToDB()
	{
		# Database credentials
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "LauraAdrian";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		# Check if there was an error connecting to the database.
		if ($conn->connect_error)
		{
			return null;

		}
		else
		{
			return $conn;
		}
	}

	function dbLogin($uName)
	{
		$connection = connectionToDB();

		if($connection != null)
		{
			$sql = "SELECT * 
				FROM Users 
				WHERE username = '$uName'";
	
			$resultDB = $connection->query($sql);

			if ($resultDB->num_rows > 0)
			{
				
				while ($row = $resultDB->fetch_assoc())
				{
					$response = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "uName"=>$row["username"], "uPass"=>$row["passwrd"], "status" => "SUCCESS");
				}

				return $response;
			}
			else
			{
				header("HTTP/1.1 406 User not found.");
				die("Wrong credentials provided.");
			}
		}
		else
		{
			return array("status" => "500");
		}
	}

	function dbRegister($uName, $uPass, $uL, $uF, $email)
	{
		$connection = connectionToDB();

		$sql = "SELECT * 
				FROM Users 
				WHERE username = '$uName'";
	
		$result = $connection->query($sql);

		if ($result->num_rows > 0)
		{
			return array("status" => "409");
		}
		else
		{
			$sql2 = "INSERT INTO users (fName, lName, username, passwrd, email) VALUES ('$uF', '$uL', '$uName', '$uPass', '$email')";

			if(mysqli_query($connection, $sql2))
				{
					$response = array("firstname"=>$uF, "lastname"=>$uL, "uName"=>$uName,"status" => "SUCCESS");
					return $response;
				}
			else
			{
				return array("status" => "501");
			}
			

		}
		
	}

	function dbGetPosts(){
		$connection = connectionToDB();
		$sql = "SELECT * FROM users JOIN posts ON users.username = posts.username";
	
		$result = $connection->query($sql);

		$response = array();
		if ($result->num_rows > 0)
		{
	
			while ($row = $result->fetch_assoc())
			{
				$currentRow = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "comment"=>$row["comment"], "postDate"=>$row["postDate"], "postID" =>$row["postID"]);
				array_push($response, $currentRow);
			}

			
			return $response;
		}
		else
		{
			return array("status" => "501");
		}
	}

	function dbGetReplies($idPost){
		$connection = connectionToDB();
		$sql = "SELECT * FROM replies JOIN users ON replies.username = users.username AND replies.postID = '$idPost'";
	
		$result = $connection->query($sql);

		$response = array();
		if ($result->num_rows > 0)
		{
	
			while ($row = $result->fetch_assoc())
			{
				$currentRow = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "reply" => $row["reply"]);
				array_push($response, $currentRow);
			}

			
			return $response;
		}
		else
		{
			return array("status" => "501");
		}
	}

	function dbGetGallery(){
		$connection = connectionToDB();
		$sql = "SELECT * FROM users JOIN images ON users.username = images.username";
	
		$result = $connection->query($sql);

		$response = array();
		if ($result->num_rows > 0)
		{
	
			while ($row = $result->fetch_assoc())
			{
				$currentRow = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "postDate"=>$row["postDate"], "image" => $row["image"]);
				array_push($response, $currentRow);
			}

			
			return $response;
		}
		else
		{
			return array("status" => "501");
		}
	}

	function dbGetPostsU($uName){
		$connection = connectionToDB();
		$sql = "SELECT * FROM users JOIN posts ON users.username = posts.username AND users.username = '$uName'";
	
		$result = $connection->query($sql);

		$response = array();
		if ($result->num_rows > 0)
		{
	
			while ($row = $result->fetch_assoc())
			{
				$currentRow = array("firstname"=>$row["fName"], "lastname"=>$row["lName"], "comment"=>$row["comment"], "postDate"=>$row["postDate"], "postID" =>$row["postID"]);
				array_push($response, $currentRow);
			}

			
			return $response;
		}
		else
		{
			return array("status" => "501");
		}
	}

	function dbPost($comment, $uName)
	{
		$connection = connectionToDB();


		$sql2 = "INSERT INTO Posts (comment, username, postDATE) VALUES ('$comment', '$uName', CURRENT_DATE())";

			if(mysqli_query($connection, $sql2))
				{
					$response = array("status" => "SUCCESS");
					return $response;
				}
			else
			{
				return array("status" => "500");
			}
	}

	function dbUpdate($comment, $idPost)
	{
		$connection = connectionToDB();


		$sql2 = "UPDATE posts SET comment = '$comment' WHERE posts.postID = '$idPost'";

			if(mysqli_query($connection, $sql2))
				{
					$response = array("status" => "SUCCESS");
					return $response;
				}
			else
			{
				return array("status" => "500");
			}
	}

	function dbDelete($idPost)
	{
		$connection = connectionToDB();


		$sql2 = "DELETE FROM posts WHERE postID = '$idPost'";

			if(mysqli_query($connection, $sql2))
				{
					$response = array("status" => "SUCCESS");
					return $response;
				}
			else
			{
				return array("status" => "409");
			}
	}

?>