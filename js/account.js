var groups = ["Cash", "Bank Account", "Asset", "Deposit", "Credit"];
var account_names = [];

$(document).ready(function () {
//--------------------------------------------------------------------------------------------------------//
  //javascript code for the accordion implement using jquery plugin
  //accordion using the account.html as well as setting.html

  $("#accordion1").click(function () {
    $("#panel1").slideToggle(1000);
    $("#rotate1").toggleClass("rotate");
  });
  $("#accordion2").click(function () {
    $("#panel2").slideToggle(1000);
    $("#rotate2").toggleClass("rotate");
  });
  $("#accordion3").click(function () {
    $("#panel3").slideToggle(1000);
    $("#rotate3").toggleClass("rotate");
  });
  $("#accordion4").click(function () {
    $("#panel4").slideToggle(1000);
    $("#rotate4").toggleClass("rotate");
  });
  $("#accordion5").click(function () {
    $("#panel5").slideToggle(1000);
    $("#rotate4").toggleClass("rotate");
  });

//--------------------------------------------------------------------------------------------------------//
  //load basecurrency from the localstorage
  var currency = JSON.parse(localStorage.getItem("basecurrency"));
  $(".currency").text(currency);

//--------------------------------------------------------------------------------------------------------//
  // code to get the data from the localstorage when window is load or page is refreshed.
  var keys = Object.keys(localStorage);
  console.log(keys);

  var net_worth = 0;
  for (var key of keys) {
    console.log(JSON.parse(localStorage.getItem(key)));
    var values = JSON.parse(localStorage.getItem(key)); // get data from the localstorage and parse into the json

    var total = 0;

    for (var i = 0; i < values.length; i++) {
      total += values[i].acc_balance;
      if(values[i].hasOwnProperty("acc_balance")){
        net_worth += values[i].acc_balance;
      }
     


      var name_account = $("<span></span>").text(values[i].acc_name);
      var balance_account = $("<span></span><br>").text(values[i].acc_balance + " " + currency);
      balance_account.css("float", "right");

      switch (key) {
        case "Cash":
          $("#cash").append(name_account, balance_account);
          $("#cash_total").text(total + " " + currency);
          break;
        case "Bank Account":
          $("#bank").append(name_account, balance_account);
          $("#bank_total").text(total + " " + currency);
          break;
        case "Asset":
          $("#asset").append(name_account, balance_account);
          $("#asset_total").text(total + " " + currency);
          break;
        case "Credit":
          $("#credit").append(name_account, balance_account);
          $("#credit_total").text(total + " " + currency);
          break;
        case "Deposit":
          $("#deposit").append(name_account, balance_account);
          $("#deposit_total").text(total + " " + currency);
          break;
        default:
          console.log("no case found");
      }
    }
    console.log(total + " total in load event");
    console.log(account_names);
    $("#net_worth").text(net_worth + " " + currency);
  }
  console.log("Net worth: " + net_worth);

//--------------------------------------------------------------------------------------------------------//
  // click event for submit account details inside modal 

  $("#submit_account").click(function () {
    var name = $("#account_name").val().trim();
    var rec_balance = $("#account_balance").val().trim();
    var group = $("#account_group").val();

    console.log(name + " " + typeof(rec_balance) + " " + group);

  
    if(name == ""){
      alert("Please enter account name");
    }else if(rec_balance == ""){
      alert("Please enter some balance");
    }else{
      var balance = parseInt(rec_balance);
      
      var account_object = {
        acc_name: name,
        acc_balance: balance,
        acc_group: group
      };

      for (var i = 0; i < groups.length; i++) {
        if (group === groups[i]) {
          if (localStorage.getItem(groups[i]) == null) {
            localStorage.setItem(groups[i], "[]");
          }
  
          var accounts = JSON.parse(localStorage.getItem(groups[i]));
          accounts.push(account_object);
  
          localStorage.setItem(groups[i], JSON.stringify(accounts));   // set data to the localstorage after convert it through sting
          console.log(localStorage);
        }
      }
      
      location.reload();
    }    
  });
});

//--------------------------------------------------------------------------------------------------------//
/*function to create json file of the data generated in the 
  website and called in setting.html through data export button*/

function exportJSON(ctx){
  var keys = Object.keys(localStorage);
  var data = new Array();
  var account = new Object();

  for (var key of keys) {
    values = JSON.parse(localStorage.getItem(key));
    console.log(key + " " + values);
     account = {
      key : values
    }
    data.push(account);
  }
  console.log("ALL data" + data);
  
  var obj = {
    dataJSON : data
  }; 
  
  var jsonData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  console
  
  ctx.setAttribute("href","data:"+jsonData);
  ctx.setAttribute("download", "data.json");    

}