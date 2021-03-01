$(document).ready(function() {
    // alert("Hello! welcome to the 2nd page!");
    $("#humbleTitle").draggable();
    $("#div1").draggable();
    $("#long1").draggable();
    $("#long2").draggable();
    $("#long3").draggable();
    $("#dot1").draggable();
    $("#dot2").draggable();
    $("#dot3").draggable();

    $("#div1").hover(function(){
        //$("#hello").show();
        //$("#hello").hide(); -> it will hide the hello ellement
        //$(this).hide();
        $("#long1").css("color", "blue");
        $("#long1").css("opacity", "1");
        //$("#humbleTitle").append(long1);
    });
    $("#long1").hover(function(){
        $("#long2").css("opacity", "1");
       $("#long2").css("color", "#E48DB4");
   });
   $("#long2").hover(function(){
    $("#long3").css("opacity", "1");
   $("#long3").css("color", "#E5DF7B");
});
    
})