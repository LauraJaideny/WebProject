$(document).ready(function(){
	$("#updateButton").on("click", function() {
	    $("#modal-img").addClass("display-block");
	});

	$("#close").on("click", function() {
	    $("#modal-img").removeClass("display-block");
	});

});
