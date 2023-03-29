//inputs
var interest_rate_input = document.getElementById("interest_rate");
var period_input = document.getElementById("period");
var calculate_input = document.getElementById("calculate");

//selects
var interest_rate_time = document.getElementById("interest_rate_time");
var period_time = document.getElementById("period_time");

//inner results
var final_total = document.getElementById("final_total");
var total_invested = document.getElementById("total_invested");
var total_interest_rate = document.getElementById("total_interest_rate");

calculate_input.addEventListener("click", function () {
    var initialValue = parseFloat(removeStyleCurrency(document.getElementById("initial_value").value));
    var monthlyValue = parseFloat(removeStyleCurrency(document.getElementById("monthly_value").value));
    var period = parseInt(period_input.value);
    var interestRate = parseFloat(interest_rate_input.value);
    var interestRate_select = interest_rate_time.value;
    var periodTime = period_time.value;
    
    if(isNaN(monthlyValue)){
        monthlyValue = 0;
    }

    if(isNaN(initialValue)){
        initialValue = 0;
    }
    
    //PERIOD TIME MEASUREMENT
    switch (periodTime) {
        case "period_year":
            period = period * 12;
            break;
        case "period_mounth":
            period = parseInt(period_input.value);
            break;
    }

    if(isNaN(period)){
        period = 0;
    }


    //INTEREST RATE TIME MEASUREMENTS
    if (interestRate_select == "rate_year") {
        interestRate = interestRate;
    }
    else {
        interestRate = monthly_interest_rate_to_annual(parseFloat(interest_rate_input.value))
    }
    
    if(isNaN(interestRate)){
        interestRate = 0;
    }


    makeInvestingCalculation(initialValue, monthlyValue, period, interestRate)
    
    final_total.innerText = "".concat(makeInvestingCalculation(initialValue, monthlyValue, period, interestRate).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_invested.innerText = "".concat(totalInvested(initialValue, monthlyValue, period).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_interest_rate.innerText = "".concat(profit(totalInvested(initialValue, monthlyValue, period), makeInvestingCalculation(initialValue, monthlyValue, period, interestRate)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
});



function removeStyleCurrency(value){
    var remove_comma = value.replace(".", "");
    var replaceToDot = remove_comma.replace(",", ".");
    var formatted = replaceToDot.replace("R$ ", "");

    return formatted;
}

function makeInvestingCalculation(initial_value, monthly_contribution, period_in_months, annual_interest_rate) {
//makeInvestingCalculation(431.55, 32.15, 12, 12.56)

    var total_final_value = initial_value;

    
    for (let i = 1; i <= period_in_months; i++) {
        
        total_final_value += total_final_value * annual_interest_rate_to_monthly(annual_interest_rate)
        total_final_value += monthly_contribution;

    }

    return parseFloat(total_final_value.toFixed(2));

}

function annual_interest_rate_to_monthly(annual_interest_rate) {
    var monthly_rate = Math.pow((1 + (annual_interest_rate / 100)), (1/12))-1

    return monthly_rate;
}

function monthly_interest_rate_to_annual(monthly_interest_rate) {
    var annual_rate = (Math.pow((1 + monthly_interest_rate / 100), 12/1) -1) * 100 

    return annual_rate;
}

function profit(total_invested, total_final) {
    var profit_amount = total_final - total_invested;

    return parseFloat(profit_amount.toFixed(2));
}

function totalInvested(initial_value, monthly_contribution, period_in_months){
    var totalInvested = initial_value;

    for (let i = 1; i <= period_in_months; i++) {

        totalInvested += monthly_contribution;

    }

    return parseFloat(totalInvested.toFixed(2));

}

module.exports = { makeInvestingCalculation,  annual_interest_rate_to_monthly, profit, totalInvested, monthly_interest_rate_to_annual};

