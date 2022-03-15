"use strict";
var initial_value_input = document.getElementById("initial_value");
var monthly_value_input = document.getElementById("monthly_value");
var interest_rate_input = document.getElementById("interest_rate");
var period_input = document.getElementById("period");
var calculate_input = document.getElementById("calculate");
var interest_rate_time = document.getElementById("interest_rate_time");
var period_time = document.getElementById("period_time");
var final_total = document.getElementById("final_total");
var total_invested = document.getElementById("total_invested");
var total_interest_rate = document.getElementById("total_interest_rate");
calculate_input.addEventListener("click", function () {
    var initialValue = parseFloat(initial_value_input.value) || 0;
    var monthlyValue = parseFloat(monthly_value_input.value) || 0;
    var interestRate = parseFloat(interest_rate_input.value) || 0;
    var period = parseInt(period_input.value) || 0;
    var monthlySum = initialValue + (monthlyValue * period) || 0;
    var interestRateTime = interest_rate_time.value;
    var periodTime = period_time.value;
    //TIME MEASUREMENTS
    if (periodTime == "period_year") {
        period = period * 12;
    }
    else {
        period = parseInt(period_input.value);
    }
    if (interestRateTime == "rate_year") {
        interestRate = interestRate / 12;
    }
    else {
        interestRate = parseFloat(interest_rate_input.value);
    }
    //CALCULATION OF COMPOUND INTEREST
    var tax = (1 + (interestRate / 100));
    var amount = (monthlySum * Math.pow(tax, period)) || 0;
    var totalInterestRate = (amount - monthlySum) || 0;
    if (totalInterestRate < 0) {
        totalInterestRate = 0;
    }
    //VALUES OUTPUT
    final_total.innerText = "".concat(amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_invested.innerText = "".concat(monthlySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    total_interest_rate.innerText = "".concat(totalInterestRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
});
