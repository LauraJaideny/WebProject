var idOfPost = 0;
var idOfDelete = 0;
$(document).ready(function(){
	getPostsU();
	
	$("#addPostText").on("click", function(){
		console.log("Pushear a la base de datos: ");
		console.log($("#postText").val());
		postComment();
	});

	$("#posts").on("click","#editPost", function(){
		idOfPost = $(this).parent().parent().find("#idPost").text();
		var text = $(this).parent().parent().find("#pText").text();
		$("#postText2").val(text);
	});

	$("#posts").on("click","#deletePost", function(){
		idOfDelete = $(this).parent().parent().find("#idPost").text();
		console.log(idOfDelete);
		deletePost();
	});

	$("#updatePostText").on("click", function(){
		console.log($("#postText2").val());
		editComment();
	});

	
	$("#uploadimage").on("submit", function(e) {
		e.preventDefault();
		//uploadImage();
		var formData = new FormData(this);
		//formData.append('action', 'UPLOADIMAGE');
		console.log(formData);
		//var jsonToSend = { "action" : 'UPLOADIMAGE'};
		$.ajax({
				//url: "data/applicationLayer.php",
				url: "data/imgapplication.php",
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(data) {
					console.log(data);
					if (data[2] == "s")
						alert("Image added succesfully");

				},
				error: function(error_message) {
					console.log(error_message);
					console.log("Error de nuevo");
				}
			});
	});


/*	$("#uploadimage").on('submit',(function(e) {
	e.preventDefault();
	$("#message").empty();
	$('#loading').show();
	console.log("This" + this);

		$.ajax({
			url: "data/ajax_php_file.php", // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{
				$('#loading').hide();
				$("#message").html(data);
			},
			error: function(error_message){
				console.log("ajax");
			}
		});
	}));

	// Function to preview image after validation
	$(function() {
		$("#file").change(function() {
			$("#message").empty(); // To remove the previous error message
			var file = this.files[0];
			var imagefile = file.type;
			var match= ["image/jpeg","image/png","image/jpg"];
			if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
			{
				$('#previewing').attr('src','noimage.png');
				$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
				return false;
			}
			else
			{
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
	});

	function imageIsLoaded(e) {
		$("#file").css("color","green");
		$('#image_preview').css("display", "block");
		$('#previewing').attr('src', e.target.result);
		$('#previewing').attr('width', '250px');
		$('#previewing').attr('height', '230px');
	};*/

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
	                $(".modal #closeAdd").click();
	                $("#postEmpty").text("");
	                $("#postText").val("");
	                getPostsU();
	            },
	            error: function(errorMsg){
	                //alert(errorMsg.statusText);
	                console.log("Hubo error");
	            }
	        });
		
	}

}

function deletePost(){
	var jsonObject = {
            "action" : "DELETEP",
            "idPost" : idOfDelete
        };

			$.ajax({
	            type: "POST",
	            url: "data/applicationLayer.php",
	            data : jsonObject,
	            dataType : "json",
	            ContentType : "application/json",
	            success: function(jsonData) {
	                alert("Comment deleted succesfully"); 
	                getPostsU();
	            },
	            error: function(errorMsg){
	                //alert(errorMsg.statusText);
	                console.log("Hubo error");
	            }
	        });
}

function editComment(){

	if($("#postText2").val()==null || $("#postText2").val()=='')
	{
		$("#postEmpty").text("Please post comment");
	}
	else
	{
		var jsonObject = {
            "comment" : $("#postText2").val(),
            "action" : "EDIT",
            "idPost" : idOfPost
        };

		
			$.ajax({
	            type: "POST",
	            url: "data/applicationLayer.php",
	            data : jsonObject,
	            dataType : "json",
	            ContentType : "application/json",
	            success: function(jsonData) {
	                alert("Comment edited succesfully"); 
	                $(".modal #closeUpdate").click();
	                $("#postEmpty").text("");
	                $("#postText2").val("");
	                getPostsU();
	            },
	            error: function(errorMsg){
	                //alert(errorMsg.statusText);
	                console.log("Hubo error");
	            }
	        });
		
	}

}

 function getPostsU(){
    var jsonToSend = {"action" : 'GETPOSTSU' };
    $("#posts").empty();
    console.log("getPosts");
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    
                    for(var i=0;i<dataReceived.length;i++)
                    {
                        $("#posts").append("<div class='card centered card-post'><div id='idPost' style='display:none;'>"+dataReceived[i].postID+"</div><div class='card-body'></div><div post-content><p class='card-text' id='pText'>"+dataReceived[i].comment+"</p></div><h6 class='card-subtitle mb-2 text-muted writtenby'>Written by: "+dataReceived[i].firstname+" "+dataReceived[i].lastname+"</h6><div class='buttonGroup float-left'><button type='button' class='btn btn-light' id='editPost' data-toggle='modal' data-target='#exampleModal2'>Edit post</button><button type='button' class='btn btn-light' id='deletePost'>Delete post</button></div></div></div>");
                        console.log(dataReceived);
                    }
                },
                error : function(errorMessage){
                    //alert(errorMessage.statusText);
                    console.log(errorMessage);
                    console.log("Error getting posts");
                    //window.location.replace("index.html");
                }
            });
}

function uploadImage(){
	var formData = new FormData();
	formData.append('file', this.files[0]);
	formData.append('action', 'UPLOADIMAGE');
	//var jsonToSend = { "action" : 'UPLOADIMAGE'};
	$.ajax({
			url: "data/applicationLayer.php",
			type: "POST",
			//data: jsonToSend,
			//dataType: "json",            
			data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data) {
				console.log(data);
			},
			error: function(error_message) {
				console.log(error_message);
				console.log("Y esto");
			}
		});
}
