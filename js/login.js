$(document).ready(function(){
	var jsonObject = { "action" : 'COOKIE' }
	$.ajax({
		url: "./data/applicationLayer.php", //rememberService.php
		type: "POST",
        data : jsonObject,
        dataType: "json",
        ContentType : "application/json",
		success: function(dataReceived){
			$("#username").val(dataReceived.cookieUserName);
		},
		error: function(errorMessage){
			alert(errorMessage.statusText);
		}
	});

	$("#loginButton").on("click", function(){

		var username = $("#username").val();
		var password = $("#userPassword").val();
		var rememberMe = $("#rememberMe").is(":checked");

		if (username != "" && password != "")
		{
			var jsonToSend = {
								"uName" : username,
								"uPassword" : password,
								"rememberMe" : rememberMe,
								"action" : 'LOGIN' 
							 };

			$.ajax({
				url : "./data/applicationLayer.php", //loginService.php
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){	
					alert("Welcome back " + dataReceived.firstname
									+ " " + dataReceived.lastname);
					window.location.replace("index.html");
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);
				}

			});
		}
		else {
			alert("Please verify the fields are not empty");
		}
	});

	  $("#registerButton").on("click", function(){
        var jsonObject = {
            "uName" : $("#username").val(),
            "uPassword" : $("#userPassword").val(),
            "uF" : $("#firstName").val(),
            "uL" : $("#lastName").val(),
            "email" : $("#email").val(),
            "action" : "REGISTER"
        };

        $.ajax({
            type: "POST",
            url: "data/applicationLayer.php",
            data : jsonObject,
            dataType : "json",
            ContentType : "application/json",
            success: function(jsonData) {
                console.log("jsonData");
                alert("User created succesfully");
                window.location.replace("index.html");  
            },
            error: function(errorMsg){
                alert(errorMsg.statusText);
                console.log("Hubo error");
            }
        });
   });

	$("#cancelButton").on("click", function(){
   		$(location).attr("href", "index.html"); 
        //window.location.replace("index.html");
    });

});