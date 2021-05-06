var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

var expense_by_month = new Object();
var income_by_month = new Object();
var transfer_by_month = new Object();

for(var i = 0; i< months.length;i++){
    expense_by_month[months[i]] = 0;
    income_by_month[months[i]] = 0;
    transfer_by_month[months[i]] = 0;    
}
//--------------------------------------------------------------------------------------------------------//
//load data from the locastorage
var transactions = JSON.parse(localStorage.getItem("Transactions"));
var currency = JSON.parse(localStorage.getItem("basecurrency"));

for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "Expense") {
        var d = new Date(transactions[i].exp_date);
        var month = months[d.getMonth()];
         expense_by_month[month] += transactions[i].exp_amount;
        console.log(month +" " + expense_by_month[month]);

    } else if (transactions[i].type === "Income") {
        var d = new Date(transactions[i].inc_date);
        var month = months[d.getMonth()];
        income_by_month[month] += transactions[i].inc_amount;
        console.log(month +" " + income_by_month[month]);
    }else if(transactions[i].type === "Transfer"){
        var d = new Date(transactions[i].tran_date);
        var month = months[d.getMonth()];
        transfer_by_month[month] += transactions[i].tran_amount;
        console.log(month +" " + transfer_by_month[month]);
    }
}
//--------------------------------------------------------------------------------------------------------//
// Array is created based on the transaction done in the particular month
var exp_tran = new Array();
for(x in expense_by_month){
    exp_tran.push(expense_by_month[x]);
}

var inc_tran = new Array();
for(x in income_by_month){
    inc_tran.push(income_by_month[x]);
}

var tra_trans = new Array();
for(x in transfer_by_month){
    tra_trans.push(transfer_by_month[x]);
}



//--------------------------------------------------------------------------------------------------------//
// object is created for data based on the transaction
var dataObjects = [
    {
        label: "Expense",
        data: exp_tran,
        backgroundColor: "#e7394a"
    },
    {
        label: "Income",
        data: inc_tran,
        backgroundColor: "#37e173"
    },
    {
        label: "Transfer",
        data: tra_trans,
        backgroundColor: "#91bae3"
    }
]
//--------------------------------------------------------------------------------------------------------//
/* data */
var data = {
    labels: months,
    datasets: [{
        label: dataObjects[0].label,
        data: dataObjects[0].data,
        /* global setting */
        backgroundColor: dataObjects[0].backgroundColor,
    }]
};

//--------------------------------------------------------------------------------------------------------//
// code to make style in the graph
var options = {
    legend: {
        display: true,
        fillStyle: "red",

        labels: {
            boxWidth: 0,
            fontSize: 24,
            fontColor: "black",
        }
    },
    scales: {
        xAxes: [{
            stacked: false,
            scaleLabel: {
                display: true,
                labelString: 'Month'
            },
        }],
        yAxes: [{
            stacked: true,
            scaleLabel: {
                display: true,
                labelString: 'Amount (' + currency +')' 
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 10
            }
        }]
    },/*end scales */
    plugins: {
       
        datalabels: {
            color: 'black',
            font: {
                size: 25
            }
        }
    }
};
//--------------------------------------------------------------------------------------------------------//
// code to generate chart
var chart = new Chart('chart-0', {
    plugins: [ChartDataLabels], 
    type: 'bar',
    data: data,
    options: options
});

//--------------------------------------------------------------------------------------------------------//
// function to change dataset based on the button is clicked
function changeData(index) {
    chart.data.datasets.forEach(function (dataset) {
        dataset.label = dataObjects[index].label;
        dataset.data = dataObjects[index].data;
        dataset.backgroundColor = dataObjects[index].backgroundColor;
    });
    chart.update();
}

