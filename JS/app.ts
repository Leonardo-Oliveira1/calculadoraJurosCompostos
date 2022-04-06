const initial_value_input = document.getElementById("initial_value") as HTMLInputElement
const monthly_value_input = document.getElementById("monthly_value") as HTMLInputElement
const interest_rate_input = document.getElementById("interest_rate") as HTMLInputElement
const period_input = document.getElementById("period") as HTMLInputElement
const calculate_input = document.getElementById("calculate") as HTMLInputElement

const interest_rate_time = document.getElementById("interest_rate_time")
const period_time = document.getElementById("period_time")

const final_total = document.getElementById("final_total")
const total_invested = document.getElementById("total_invested")
const total_interest_rate = document.getElementById("total_interest_rate")!


calculate_input.addEventListener("click", function(){
    const initialValue: number = parseFloat(initial_value_input.value) || 0;
    const monthlyValue: number = parseFloat(monthly_value_input.value) || 0;
    let interestRate: number = parseFloat(interest_rate_input.value) || 0;
    let period: number = parseInt(period_input.value) || 0;
    let monthlySum = initialValue + (monthlyValue * period) || 0;
    const interestRateTime: string = (<HTMLSelectElement>interest_rate_time).value;
    const periodTime: string = (<HTMLSelectElement>period_time).value;

    //TIME MEASUREMENTS

    switch (periodTime) {
        case "period_year":
            period = period * 12;
            break;

        case "period_mounth":
            period = parseInt(period_input.value)
            break;

        case "period_daily":
            period = period / 30;
            console.log("Diario")
            break;
    }

    if (interestRateTime == "rate_year"){
        interestRate = interestRate / 12;
    }else{
        interestRate = parseFloat(interest_rate_input.value);
    }

    //CALCULATION OF COMPOUND INTEREST
    const tax = (1 + (interestRate / 100));
    const amount = (monthlySum * Math.pow(tax, period)) || 0;
    let totalInterestRate = (amount - monthlySum) || 0;
    
    if (totalInterestRate < 0){
        totalInterestRate = 0;
    }

    //VALUES OUTPUT
    final_total!.innerText = `${amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    total_invested!.innerText = `${monthlySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    total_interest_rate!.innerText = `${totalInterestRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

})
