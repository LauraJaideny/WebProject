$(document).ready(function() {
    getGallery();

    $("#gallery").on("click", "#favorite", addFavorite); 

    $("#filterBtn").on("click", function(){
        //console.log("La fecha es: "+$("#dateText").val());
        getGalleryDate();
        //SELECT * FROM `posts` WHERE postDate = '2018/04/23'
    });

    $("#clearBtn").on("click", function(){
        $("#dateText").val("");
        getGallery();
        //SELECT * FROM `posts` WHERE postDate = '2018/04/23'
    });
          
});

 function getGallery(){
    var jsonToSend = {"action" : 'GETGALLERY' };
    console.log("getGallery");
    $("#gallery").empty();
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    $("#gallery").empty();
                    for(var i = 0; i<dataReceived.length; i++)
                    {	
                        $("#gallery").append("<div class='card-gal'><div id='idImage' style='display:none;'>"+dataReceived[i].imageID+"</div><img class='card-img-top' src='" + dataReceived[i].image + " 'alt='Card image cap'><div class='card-body-gal'><p class='card-text-bottom'>" + dataReceived[i].firstname + " " + dataReceived[i].lastname + "</p><p class='card-text-bottom'>" + dataReceived[i].postDate + "</p><input type='button' class='favorite btn btn-light' value='Favorite' id='favorite'/></div></div>");
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

function getGalleryDate(){
    var jsonToSend = {"action" : 'GETGALLERYDATE',
    "date" :  $("#dateText").val()};
    console.log("getGallery");
    $("#gallery").empty();
        $.ajax({
                url : "data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContentType : "application/json",
                success : function(dataReceived){
                    
                    for(var i = 0; i<dataReceived.length; i++)
                    {   
                        $("#gallery").append("<div class='card-gal'><div id='idImage' style='display:none;'>"+dataReceived[i].imageID+"</div><img class='card-img-top' src='" + dataReceived[i].image + " 'alt='Card image cap'><div class='card-body-gal'><p class='card-text-bottom'>" + dataReceived[i].firstname + " " + dataReceived[i].lastname + "</p><p class='card-text-bottom'>" + dataReceived[i].postDate + "</p><input type='button' class='favorite' value='Favorite' id='favorite'/></div></div>");
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


function addFavorite(){
    var idImage = $(this).parent().parent().find("#idImage").text();
    console.log("idImage: " + idImage);
    var jsonToSend = {"action" : 'ADDFAVORITEIMAGE',
                      "idImage" : idImage };
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

/*

 <div class='card-gal'>
    <div id='idImage' style='display:none;'>"+dataReceived[i].imageID+"</div>
    <img class='card-img-top' src='" + dataReceived[i].image + " 'alt='Card image cap'>
    <div class='card-body-gal'>
        <p class='card-text-bottom'>" + dataReceived[i].firstname + " " + dataReceived[i].lastname + "</p>
        <p class='card-text-bottom'>" + dataReceived[i].postDate + "</p>
        <input type='button' class='favorite' value='Favorite' id='favorite'/>
    </div>
</div>

*/