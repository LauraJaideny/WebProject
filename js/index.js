 var idOfPost;
 $(document).ready(function() {

    getPosts();

    $("#posts").on("click", "#favoritePost", addFavorite);          

    $("#posts").on("click","#commentPost", function(){
        idOfPost = $(this).parent().parent().find("#idPost").text();
    });  

    $("#commentPostText").on("click", function(){
        //console.log($("#postText2").val());
        postReply();
    });    

});

 function addFavorite(){
    var idPost = $(this).parent().parent().find("#idPost").text();
    console.log("idPost: " + idPost);
    var jsonToSend = {"action" : 'ADDFAVORITE',
                      "idPost" : idPost };
    $.ajax({
        url : "data/applicationLayer.php",
        type : "POST",
        dataType : "json",
        data: jsonToSend,
        ContentType : "application/json",
        success : function(dataReceived){
            alert(dataReceived.success);
        },
        error : function(errorMessage){
            alert(errorMessage.statusText);
            console.log(errorMessage);
            console.log("Fail in adding favorite");
        }
    })
 }

 function getPosts(){
    var jsonToSend = {"action" : 'GETPOSTS' };
    console.log("getPosts");
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    $("#posts").empty();
                    for(var i=0;i<dataReceived.length;i++)
                    {

                        $("#posts").append("<div class='card centered card-post' id='postCard"+dataReceived[i].postID+"'><div id='idPost' style='display:none;'>"+dataReceived[i].postID+"</div><div class='card-body'></div><div post-content><p class='card-text'>"+dataReceived[i].comment+"</p></div><h6 class='card-subtitle mb-2 text-muted writtenby'>Written by: "+dataReceived[i].firstname+" "+dataReceived[i].lastname+"</h6><div class='buttonGroup float-left'><button type='button' class='btn btn-light' id='commentPost' data-toggle='modal' data-target='#exampleModal'>Comentar</button><button type='button' id='favoritePost' class='btn btn-light fav-btn' data-toggle='button' aria-pressed='false' autocomplete='off'>Favorite</button></div></div></div>");
                        //console.log(dataReceived);
                        getReplies(dataReceived[i].postID);
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

function getReplies(idPost)
{
    var jsonToSend = {"action" : 'GETREPLIES',
                        "idPost" : idPost };
    console.log("getReplies");
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    for(var i=0;i<dataReceived.length;i++)
                    {
                        $("#postCard"+idPost).append("<div class='card-body reply'><p class='card-text'>"+dataReceived[i].reply+"</p><h6 class='card-subtitle mb-2 text-muted writtenby'>Written by: "+dataReceived[i].firstname+" "+dataReceived[i].lastname+"</h6></div>");
                        console.log(dataReceived);
                    }
                },
                error : function(errorMessage){
                    //alert(errorMessage.statusText);
                    console.log(errorMessage);
                    console.log("Error getting replies");
                    //window.location.replace("index.html");
                }

            });
}

function postReply()
{
    if($("#postText").val()==null || $("#postText").val()=='')
    {
        $("#postEmpty").text("Please post comment");
    }
    else
    {
        var jsonObject = {
            "reply" : $("#postText").val(),
            "action" : "ADDREPLY",
            "idPost" : idOfPost
        };

        
            $.ajax({
                type: "POST",
                url: "data/applicationLayer.php",
                data : jsonObject,
                dataType : "json",
                ContentType : "application/json",
                success: function(jsonData) {
                    alert("Replied succesfully"); 
                    $(".modal #closeComment").click();
                    $("#postEmpty").text("");
                    $("#postText").val("");
                    getPosts();
                },
                error: function(errorMsg){
                    //alert(errorMsg.statusText);
                    console.log("Hubo error");
                }
            });
        
    }

}