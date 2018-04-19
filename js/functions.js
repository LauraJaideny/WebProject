 $(document).ready(function() {
          
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

});