
$(document).ready(function() {
//--------------------------------------------------------------------------------------------------------//
    //accordion implementation using jquery ui widget 
    $("#accordion_worth").accordion({
        collapsible:true,
        heightStyle:true
    });
    $("#accordion_trans").accordion({
        collapsible:true,
        active:0,
        heightStyle:true
    });

    $("#accordion_account").accordion({
        collapsible:true,
        active:0,
        heightStyle:true
    });
//--------------------------------------------------------------------------------------------------------//
    // load basecurrency from the localstorage 
    var currency = JSON.parse(localStorage.getItem("basecurrency"));
    console.log("DASHBOAR" + currency);
    $(".currency").text(currency);

});