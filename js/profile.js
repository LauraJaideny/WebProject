$(document).ready(function(){
	
	$("#addPostText").on("click", function(){
		console.log("Pushear a la base de datos: ");
		console.log($("#postText").val());
		postComment();
	});

});

function postComment(){

	if($("#postText").val()==null || $("#postText").val()=='')
	{
		$("#postEmpty").text("Please post comment");
	}
	else
	{
		var jsonObject = {
            "comment" : $("#postText").val(),
            "action" : "POST"
        };

		
			$.ajax({
	            type: "POST",
	            url: "data/applicationLayer.php",
	            data : jsonObject,
	            dataType : "json",
	            ContentType : "application/json",
	            success: function(jsonData) {
	                alert("Comment posted succesfully"); 
	                $('.modal').modal('toggle');
	                $("#postEmpty").text("");
	                $("#postText").val("");
	            },
	            error: function(errorMsg){
	                //alert(errorMsg.statusText);
	                console.log("Hubo error");
	            }
	        });
		
	}

}
