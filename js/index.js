 $(document).ready(function() {

    getPosts();

    $(".btn btn-light fav-btn").on("click", addFavorite);          

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
            //alert(errorMessage.statusText);
            console.log("fail in adding favorite");
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
                        $("#posts").append("<div class='card centered card-post'><div id='idPost' style='display:none;'>"+dataReceived[i].postID+"</div><div class='card-body'></div><div post-content><p class='card-text'>"+dataReceived[i].comment+"</p></div><h6 class='card-subtitle mb-2 text-muted writtenby'>Written by: "+dataReceived[i].firstname+" "+dataReceived[i].lastname+"</h6><div class='buttonGroup float-left'><button type='button' class='btn btn-light'>Comentar</button><button type='button' class='btn btn-light fav-btn' data-toggle='button' aria-pressed='false' autocomplete='off'>Favorite</button></div></div></div>");
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
