var idOfImage = 0;
var idOfDelete = 0;
$(document).ready(function(){
	getImagesUser();

	$("#gallery").on("click","#deleteImage", function(){
		idOfDelete = $(this).parent().parent().find("#idImage").text();
		console.log(idOfDelete);
		deleteImage();
	});

});

function deleteImage(){
	var jsonObject = {
            "action" : "DELETEIMAGE",
            "idImage" : idOfDelete
        };

			$.ajax({
	            type: "POST",
	            url: "data/applicationLayer.php",
	            data : jsonObject,
	            dataType : "json",
	            ContentType : "application/json",
	            success: function(jsonData) {
	                alert("Image deleted succesfully"); 
	                getImagesUser();
	            },
	            error: function(errorMsg){
	                //alert(errorMsg.statusText);
	                console.log("Hubo error");
	            }
	        });
}


 function getImagesUser(){
    var jsonToSend = {"action" : 'GETIMAGESUSER' };
    $("#gallery").empty();
    console.log("getImages");
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    
                    for(var i=0;i<dataReceived.length;i++)
                    {
                        $("#gallery").append("<div class='card-gal'><div id='idImage' style='display:none;'>"+dataReceived[i].imageID+"</div><img class='card-img-top' src='" + dataReceived[i].image + " 'alt='Card image cap'><div class='card-body-gal'><p class='card-text-bottom'>" + dataReceived[i].firstname + " " + dataReceived[i].lastname + "</p><p class='card-text-bottom'>" + dataReceived[i].postDate + "</p><input type='button' class='delete btn btn-light' value='Delete' id='deleteImage'/></div></div>");
                        console.log(dataReceived);
                    }
                },
                error : function(errorMessage){
                    //alert(errorMessage.statusText);
                    console.log(errorMessage);
                    console.log("Error getting images");
                    //window.location.replace("index.html");
                }
            });
}

