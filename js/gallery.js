 $(document).ready(function() {

    getGallery();
          

});

 function getGallery(){
    var jsonToSend = {"action" : 'GETGALLERY' };
    console.log("getPosts");
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    $("#gallery").empty();
                    for(var i=0;i<dataReceived.length;i++)
                    {	
                        //$("#gallery").append("<span class='card-gal'><img class='card-img-top' src='data:image/jpeg;base64,'.base64_encode("+dataReceived[i].image+" ).' ' alt='Card image cap'><div class='card-body-gal'><p class='card-text-bottom'>"+dataReceived[i].firstname+" "+dataReceived[i].lastname+"</p><p class='card-text-bottom'>"+dataReceived[i].postDate+"</p><input type='button' class='favorite' value='Favorite'/></div></span>");
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
