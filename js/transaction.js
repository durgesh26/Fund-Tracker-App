var accounts = new Array();


$(document).ready(function () {
  //--------------------------------------------------------------------------------------------------------//
  // click event for tabs inside the modal in transaction page
  $(".tablinks").click(function (event) {
    event.preventDefault();

    $(".tabcontent").css("display", "none");
    $(".activetab").removeClass("activetab");
    $(this).addClass('activetab');
    var id = this.id;
    console.log(id);
    $("." + id).css("display", "block");
  });

  //--------------------------------------------------------------------------------------------------------//



  // code to populate accounts array from the localstorage.
  var total_expense = 0;
  var total_income = 0; 
  var total_transaction = 0;

  //load basecurency from the localstorage
  var currency = JSON.parse(localStorage.getItem("basecurrency"));
  console.log("transaction:  " + currency);
  $(".currency").text(currency);

  var keys = Object.keys(localStorage);
  console.log(keys);
  for (var key of keys) {
    console.log(JSON.parse(localStorage.getItem(key)));
    var values = JSON.parse(localStorage.getItem(key)); // get data from the localstorage

    for (var i = 0; i < values.length; i++) {
      if (values[i].hasOwnProperty('acc_name')) {
        accounts.push(values[i].acc_name);
      }
    }

    if (key === "Transactions") {
      $("#transactions").text("");
      var all_transaction = JSON.parse(localStorage.getItem(key));
      for (var i = 0; i < all_transaction.length; i++) {
        if (all_transaction[i].type === "Expense") {

          var d = new Date(all_transaction[i].exp_date);
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
          var date_format = d.getDate() + " " + months[d.getMonth()];

          total_expense += all_transaction[i].exp_amount;
          console.log("Expense total: " + total_expense);

          var type = $("<span class='badge badge-danger'></span>").text(all_transaction[i].type);
          type.css({"margin": "0px 20px 10px 0px", "font-weight": "bold"});
          var date = $("<span></span>").text(date_format);
          date.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var account = $("<span></span>").text(all_transaction[i].exp_account);
          account.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var arrow = $("<span></span>").html("&#8594;");
          arrow.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var tag = $("<span></span>").text(all_transaction[i].exp_tag);
          tag.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold"});

          var note = $("<span></span>").text(all_transaction[i].exp_note);
          note.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var amount = $("<span></span><br>").text("-" + all_transaction[i].exp_amount + " " + currency);
          amount.css({ "float": "right", "font-weight": "bold", "color": "rgb(242,92,92)" });

          $("#transactions").append(type,date, account, arrow, tag, note, amount);

        }else if(all_transaction[i].type === "Income"){
          var d = new Date(all_transaction[i].inc_date);
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
          var date_format = d.getDate() + " " + months[d.getMonth()];


          total_income += all_transaction[i].inc_amount;


          var type = $("<span class='badge badge-success'></span>").text(all_transaction[i].type);
          type.css({"margin": "0px 20px 10px 0px", "font-weight": "bold"});
          var date = $("<span></span>").text(date_format);
          date.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var account = $("<span></span>").text(all_transaction[i].inc_account);
          account.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var arrow = $("<span></span>").html("&#8592;");
          arrow.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var tag = $("<span></span>").text(all_transaction[i].inc_tag);
          tag.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });

          var note = $("<span></span>").text(all_transaction[i].inc_note);
          note.css({ "margin": "0px 20px 10px 0px" });
          var amount = $("<span></span><br>").text(all_transaction[i].inc_amount + " " + currency);
          amount.css({ "float": "right", "font-weight": "bold", "color": "green" });

          $("#transactions").append(type,date, account, arrow, tag, note, amount);
        }else if(all_transaction[i].type === "Transfer"){

          var d = new Date(all_transaction[i].tran_date);
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
          var date_format = d.getDate() + " " + months[d.getMonth()];

          var type = $("<span class='badge badge-dark'></span>").text(all_transaction[i].type);
          type.css({"margin": "0px 20px 10px 0px", "font-weight": "bold"});
          var date = $("<span></span>").text(date_format);
          date.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var account = $("<span></span>").text(all_transaction[i].tran_from);
          account.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var arrow = $("<span></span>").html("&#8594;");
          arrow.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });
          var tag = $("<span></span>").text(all_transaction[i].tran_to);
          tag.css({ "margin": "0px 20px 10px 0px", "font-weight": "bold" });

          var note = $("<span></span>").text(all_transaction[i].tran_note);
          note.css({ "margin": "0px 20px 10px 0px" });
          var amount = $("<span></span><br>").text(all_transaction[i].tran_amount + " " + currency);
          amount.css({ "float": "right", "font-weight": "bold"});

          $("#transactions").append(type,date, account, arrow, tag, note, amount);
        }


      }
      total_transaction = total_income - total_expense;

      $("#total_expense").text("-" + total_expense + " " + currency);
      $("#total_expense").css({"font-weight":"bold"});
      $("#total_income").text(total_income + " " + currency);
      $("#total_income").css({"font-weight":"bold"});
      $("#total_trans").text(total_transaction + " " + currency);
      $("#total_trans").css({"font-weight":"bold"});

    }
  }
  console.log("accounts are as: " + accounts);


  //--------------------------------------------------------------------------------------------------------//
  // code to generate dropdown option based on the dynamic data from the localstorage.
  var expense = document.getElementById("expense_accounts");
  var transfer1 = document.getElementById("transfer_from");
  var transfer2 = document.getElementById("transfer_to");
  var income = document.getElementById("income_accounts");

  for (var i = 0; i < accounts.length; i++) {
    var opt = accounts[i];
    var options = document.createElement("option");
    options.text = opt;
    options.value = opt;

    expense.add(options);


  }

  for (var i = 0; i < accounts.length; i++) {
    var opt = accounts[i];
    var options = document.createElement("option");
    options.text = opt;
    options.value = opt;


    transfer1.add(options);

  }

  for (var i = 0; i < accounts.length; i++) {
    var opt = accounts[i];
    var options = document.createElement("option");
    options.text = opt;
    options.value = opt;


    transfer2.add(options);

  }

  for (var i = 0; i < accounts.length; i++) {
    var opt = accounts[i];
    var options = document.createElement("option");
    options.text = opt;
    options.value = opt;


    income.add(options);

  }

  //--------------------------------------------------------------------------------------------------------//
  // code for the datapicker using jquery plugins
  $(".datepicker").datepicker();


  //--------------------------------------------------------------------------------------------------------//
  //click event for the submit_expense details inside transaction modal
  $("#submit_expense").click(function () {
    var expense_account = $("#expense_accounts").val().trim();
    var expense_amount = $("#expense_amount").val().trim();
    var expense_tag = $("#expense_tags").val().trim();
    var expense_date = $("#expense_date").val().trim();
    var expense_note = $("#expense_note").val().trim();

    console.log(expense_account + " " + typeof (expense_amount) + " " + expense_tag + " " + typeof (expense_date) + " " + expense_note);

    if(expense_account == ""){
      alert("Please enter account")
    }else if (expense_amount == "") {
      alert("Please enter expense amount.");
    } else if (expense_date == "") {
      alert("Please enter date.")
    } else {
      var exp_amount = parseInt(expense_amount);
      var exp_date = Date.parse(expense_date);
      console.log("Date: " + exp_date);


      var keys = Object.keys(localStorage);
      console.log(keys);
      for (var key of keys) {
        console.log(JSON.parse(localStorage.getItem(key)));
        var values = JSON.parse(localStorage.getItem(key));

        var exp_accounts = new Array();
        for (var i = 0; i < values.length; i++) {

          if (values[i].hasOwnProperty("acc_name")) {
            if (expense_account === values[i].acc_name) {
              values[i].acc_balance -= exp_amount;

            }

            var object = {
              acc_name: values[i].acc_name,
              acc_balance: values[i].acc_balance,
              acc_group: values[i].acc_group
            }
            exp_accounts.push(object);
            localStorage.setItem(key, JSON.stringify(exp_accounts));//set transaction data into localstorage
          }


        }
      }


      var expense_object = {
        type: "Expense",
        exp_account: expense_account,
        exp_amount: exp_amount,
        exp_tag: expense_tag,
        exp_note: expense_note,
        exp_date: exp_date
      };

      if (localStorage.getItem("Transactions") == null) {
        localStorage.setItem("Transactions", "[]");
      }
      var expenses = JSON.parse(localStorage.getItem("Transactions"));
      expenses.push(expense_object);

      localStorage.setItem("Transactions", JSON.stringify(expenses));

      location.reload();
    }
  });


  //--------------------------------------------------------------------------------------------------------//
  //click event for the submit_income details inside transaction modal
  $("#submit_income").click(function () {
    var income_account = $("#income_accounts").val().trim();
    var income_amount = $("#income_amount").val().trim();
    var income_tag = $("#income_tags").val().trim();
    var income_date = $("#income_date").val().trim();
    var income_note = $("#income_note").val().trim();

    console.log("Income details: " + income_account + " " + income_amount + " " + income_tag + " " + income_date + " " + income_note);


    if (income_amount == "") {
      alert("Please enter income amount.");
    } else if (income_date == "") {
      alert("Please enter date.")
    } else {
      var inc_amount = parseInt(income_amount);
      var inc_date = Date.parse(income_date);
      console.log("Date: " + inc_date);


      var keys = Object.keys(localStorage);
      console.log(keys);
      for (var key of keys) {
        console.log(JSON.parse(localStorage.getItem(key)));
        var values = JSON.parse(localStorage.getItem(key));

        var inc_accounts = new Array();
        for (var i = 0; i < values.length; i++) {

          if (values[i].hasOwnProperty("acc_name")) {
            if (income_account === values[i].acc_name) {
              values[i].acc_balance += inc_amount;

            }

            var object = {
              acc_name: values[i].acc_name,
              acc_balance: values[i].acc_balance,
              acc_group: values[i].acc_group
            }
            inc_accounts.push(object);
            localStorage.setItem(key, JSON.stringify(inc_accounts));
          }


        }
      }


      var income_object = {
        type: "Income",
        inc_account: income_account,
        inc_amount: inc_amount,
        inc_tag: income_tag,
        inc_note: income_note,
        inc_date: inc_date
      };

      if (localStorage.getItem("Transactions") == null) {
        localStorage.setItem("Transactions", "[]");
      }
      var incomes = JSON.parse(localStorage.getItem("Transactions"));
      incomes.push(income_object);

      localStorage.setItem("Transactions", JSON.stringify(incomes));

      location.reload();
    }
  });


  //--------------------------------------------------------------------------------------------------------//
  //click event for the submit_transfer details inside transaction modal
  $("#submit_transfer").click(function () {
    var transfer_from = $("#transfer_from").val().trim();
    var transfer_amount = $("#transfer_amount").val().trim();
    var transfer_to = $("#transfer_to").val().trim();
    var transfer_date = $("#transfer_date").val().trim();
    var transfer_note = $("#transfer_note").val().trim();

    console.log("Transfer details: " + transfer_from + " " + transfer_amount + " " + transfer_to + " " + transfer_date + " " + transfer_note);


    if (transfer_amount == "") {
      alert("Please enter transfer amount.");
    } else if (transfer_date == "") {
      alert("Please enter date.")
    } else {
      var tran_amount = parseInt(transfer_amount);
      var tran_date = Date.parse(transfer_date);
      console.log("Date: " + tran_date);


      var keys = Object.keys(localStorage);
      console.log(keys);
      for (var key of keys) {
        console.log(JSON.parse(localStorage.getItem(key)));
        var values = JSON.parse(localStorage.getItem(key));

        var tran_accounts = new Array();
        for (var i = 0; i < values.length; i++) {

          if (values[i].hasOwnProperty("acc_name")) {
            if (transfer_from === values[i].acc_name) {
              values[i].acc_balance -= tran_amount;
            }
            if (transfer_to === values[i].acc_name) {
              values[i].acc_balance += tran_amount;
            }

            var object = {
              acc_name: values[i].acc_name,
              acc_balance: values[i].acc_balance,
              acc_group: values[i].acc_group
            }
            tran_accounts.push(object);
            localStorage.setItem(key, JSON.stringify(tran_accounts));
          }


        }
      }


      var transfer_object = {
        type: "Transfer",
        tran_from: transfer_from,
        tran_amount: tran_amount,
        tran_to: transfer_to,
        tran_note: transfer_note,
        tran_date: tran_date
      };

      if (localStorage.getItem("Transactions") == null) {
        localStorage.setItem("Transactions", "[]");
      }
      var transfers = JSON.parse(localStorage.getItem("Transactions"));
      transfers.push(transfer_object);

      localStorage.setItem("Transactions", JSON.stringify(transfers));

      location.reload();
    }
  });





});