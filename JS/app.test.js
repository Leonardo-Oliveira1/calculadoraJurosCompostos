const { makeInvestingCalculation, annual_interest_rate_to_monthly, profit, totalInvested , monthly_interest_rate_to_annual} = require('./app');

test('convert interest annual rate is working correct', () => {
  expect(annual_interest_rate_to_monthly(14.5)).toBe(0.011347621038123146);
});

test('convert interest monthly rate is working correct', () => {
  expect(monthly_interest_rate_to_annual(12.56)).toBe(313.6271266843893);
});
    
test('compound interest calculation', () => {
  expect(makeInvestingCalculation(431.55, 32.15, 12, 12.56)).toBe(893.29);
});

test('profit calculation', () => {
    expect(profit(totalInvested(100, 1, 12), makeInvestingCalculation(100, 1, 12, 1))).toBe(1.05);
});

test('total invested calculation', () => {
    expect(totalInvested(100, 1, 12)).toBe(112);
});