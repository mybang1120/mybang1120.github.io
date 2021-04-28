$(document).ready(function(){
    // $("#dropped").hide();
    $("#dropped_hidden2").hide();
    $("#dropped_hidden3").hide();
    $("#dropped_hidden4").hide();

    $("#drop1").click(function(){
        $("#dropped").toggle();
    });
    $("#drop2").click(function(){
        $("#dropped_hidden2").toggle();
    });
    $("#drop3").click(function(){
        $("#dropped_hidden3").toggle();
    });
    $("#drop4").click(function(){
        $("#dropped_hidden4").toggle();
    });
})
