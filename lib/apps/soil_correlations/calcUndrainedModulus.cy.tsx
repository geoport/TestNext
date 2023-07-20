import calcUndrainedModulus from './undrained_modulus';

// Test cases for Undrained Modulus correlations with undrainedShearStrength and effectiveStress input
describe('calcUndrainedModulus function', () => {
  // Test case for the "strozykandTankiewicz2016" function
  it('returns the correct result for "strozykandTankiewicz2016" function', () => {
    // Define input values
    const inputData = { undrainedShearStrength: '30.7', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '5645.710';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "strozykandTankiewicz2016_2" function
  it('returns the correct result for "strozykandTankiewicz2016_2" function', () => {
    // Define input values
    const inputData = { effectiveStress: '100000', selectedValue: 'median' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '5036.520';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedModulus(inputData, soilClass)).to.equal(expectedOutput);
  });
});
