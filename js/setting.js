
$(document).ready(function () {
//--------------------------------------------------------------------------------------------------------//
    // click event to reset all setting in the website will reload overall website
    $("#reset_button").click(function () {
        localStorage.clear();
        location.reload();
        if(JSON.parse(localStorage.getItem("basecurrency") == null)){
            localStorage.setItem("basecurrency",JSON.stringify("USD"));
        }
    });

//--------------------------------------------------------------------------------------------------------//
    //code to get data from the json file using ajax jquery
    $.ajax({
        type: "get",
        url: "json/currencies.json",
        timeout: 10000,
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
        },
        dataType: "json",
        success: function (data) {
            var currencies = document.getElementById("basecurrency");
            var from_currencies = document.getElementById("from_currency");
            var to_currencies = document.getElementById("to_currency");
            for (const currency in data) {
                var key = currency;
                var value = data[currency];
                var options = document.createElement("option");
                options.text = key + ", " + value;
                options.value = key;
                currencies.add(options);
            }
            for (const currency in data) {
                var key = currency;
                var value = data[currency];
                var options = document.createElement("option");
                options.text = key + ", " + value;
                options.value = key;
                from_currencies.add(options);
            }
            for (const currency in data) {
                var key = currency;
                var value = data[currency];
                var options = document.createElement("option");
                options.text = key + ", " + value;
                options.value = key;
                to_currencies.add(options);
            }
        }
    });
//--------------------------------------------------------------------------------------------------------//
    //code to set the basecurrency when button is clicked
    $("#basecurrency").change(function () {
        var currency = $("#basecurrency").val().trim();
        localStorage.setItem("basecurrency", JSON.stringify(currency));
        alert("Base currency change to " + currency);
    });

 //--------------------------------------------------------------------------------------------------------//
   //code to get the data from the api and perform exchange rate in the webpage
    $("#from_currency").change(function(){
        var from = $("#from_currency").val().trim();
        var amount = parseInt($("#from").val().trim());

        $("#to_currency").change(function(){
            var to = $("#to_currency").val().trim();

            $.ajax({
                url: "https://v6.exchangerate-api.com/v6/43aa27cbdd940720a973e02e/latest/" + from,
                type: "get",
                timeout: 10000,
                error: function (xhr, status, error) {
                    alert("Error: " + xhr.status + " - " + error);
                },
                dataType: "json",
                success: function (data) {
                    var rates;
                    rates = amount * data.conversion_rates[to];
                    console.log(from +"to " +to +" " + rates);
                    $("#to").val(rates);
                } 
            });
            
 
            
        })
    })



    
});


