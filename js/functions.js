 $(document).ready(function() {

    getSession();
          

  $("#logoutBtn").on("click", function(){
        logout();
  });

});

 function getSession(){
    var jsonToSend = {"action" : 'GETSESSION' };
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    //$("#loginCurr").text("Currently logged in as "+dataReceived.firstname+" "+dataReceived.lastname);
                    console.log("Currently logged in as "+dataReceived.firstname+" "+dataReceived.lastname);
                    $("#myProfile").text(dataReceived.firstname);
                },
                error : function(errorMessage){
                    //alert(errorMessage.statusText);
                    console.log(errorMessage);
                    console.log("No hay nadie conectado");
                    alert("Please login to access this page");
                    window.location.replace("login.html");
                }

            });
}

function logout(){
        var jsonToSend = {"action" : 'LOGOUT' };
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    console.log("hola "+dataReceived);
                    window.location.replace("login.html");
                },
                error : function(errorMessage){
                    alert(errorMessage.statusText);
                    console.log(errorMessage);
                    console.log("Error logout");
                }

            });


}