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
					jsonToSend = {
						"action" : 'LOGOUT'
					}
					$.ajax({
	                    url: "data/applicationLayer.php", //deleteSessionService.php
	                    type : "POST",
						data : jsonToSend,
						ContentType : "application/json",
						dataType : "json",
	                    success: function(dataReceived){
	                        alert(dataReceived.success);
	                    },
	                    error: function(errorMessage){
	                        alert(errorMessage.statusText);
	                    }
	                });

					var json = {
								"username" : username,
								"password" : password,
								"action" : 'STARTSESSION'
							 };
					
	                $.ajax({
	                    type: "POST",
	                    url: "./data/applicationLayer.php", //startSessionService.php
	                    data : json,
	                    dataType : "json",
	                    ContentType : "application/json",
	                    success: function(dataReceived){
	                        alert(dataReceived.success);
	                    },
	                    error: function(errorMessage){
	                        alert(errorMessage.statusText);
	                    }
	                }); 
	                
					alert("Welcome back " + dataReceived.username);
					window.location.replace("./index.html");
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

	$("#cancelButton").on("click", function(){
   		$(location).attr("href", "index.html"); 
        //window.location.replace("index.html");
    });

});