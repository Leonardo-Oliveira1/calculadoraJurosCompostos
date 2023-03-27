var interest_rate_input = document.getElementById("interest_rate");

var period_input = document.getElementById("period");
var calculate_input = document.getElementById("calculate");
var interest_rate_time = document.getElementById("interest_rate_time");
var period_time = document.getElementById("period_time");
var final_total = document.getElementById("final_total");
var total_invested = document.getElementById("total_invested");
var total_interest_rate = document.getElementById("total_interest_rate");

calculate_input.addEventListener("click", function () {
    var initialValue = parseFloat(removeStyleCurrency(document.getElementById("initial_value").value));
    var monthlyValue = parseFloat(removeStyleCurrency(document.getElementById("monthly_value").value));
    var interestRate = parseFloat(interest_rate_input.value);
    var period = parseInt(period_input.value);

    var monthlySum = initialValue + (monthlyValue * period);
    var interestRateTime = interest_rate_time.value;
    var periodTime = period_time.value;

    if(isNaN(monthlyValue)){
        monthlyValue = 0;
    }

    if(isNaN(initialValue)){
        initialValue = 0;
    }
       
    console.clear()
    console.log("Valor inicial: " + initialValue);
    console.log("Valor mensal: " + monthlyValue);
    //TIME MEASUREMENTS
    switch (periodTime) {
        case "period_year":
            period = period * 12;
            break;
        case "period_mounth":
            period = parseInt(period_input.value);
            break;
        case "period_daily":
            period = period / 30;
            break;
    }

    if(isNaN(period)){
        period = 0;
    }

    console.log("Periodo: " + period);

    if (interestRateTime == "rate_year") {
        interestRate = interestRate / 12;
    }
    else {
        interestRate = parseFloat(interest_rate_input.value);
    }

    if(isNaN(interestRate)){
        interestRate = 0;
    }

    console.log("Taxa: " + interestRate);

    //CALCULATION OF COMPOUND INTEREST
    var tax = (1 + (interestRate / 100));
    var amount = (monthlySum * Math.pow(tax, period)) || 0;
    var totalInterestRate = (amount - monthlySum) || 0;
    if (totalInterestRate < 0) {
        totalInterestRate = 0;
    }

    if(isNaN(monthlySum)){
        monthlySum = 0;
    }
    
    //VALUES OUTPUT
    final_total.innerText = "".concat(amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_invested.innerText = "".concat(monthlySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_interest_rate.innerText = "".concat(totalInterestRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
});

function removeStyleCurrency(value){
    var remove_comma = value.replace(".", "");
    var replaceToDot = remove_comma.replace(",", ".");
    var formatted = replaceToDot.replace("R$ ", "");

    return formatted;
}
