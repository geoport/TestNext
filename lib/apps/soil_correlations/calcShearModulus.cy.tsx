import calcShearModulus from './shear_modulus';

// Test cases for Shear Modulus correlations with N1_60 and N60 inputs
describe('calcShearModulus function', () => {
  // Test case for the "anbazgahanandSitraham2007" function
  it('returns the correct result for "anbazgahanandSitraham2007" function', () => {
    // Define input values
    const inputData = { N1_60: '34', selectedValue: 'minimum' };
    const soilClass = 'SW';

    // Define expected output value
    const expectedOutput = '12980.390';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "anbazgahanSitrahamandDiryac2007" function
  it('returns the correct result for "anbazgahanSitrahamandDiryac2007" function', () => {
    // Define input values
    const inputData = { N1_60: '24', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '10242.960';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imaiandTonouchi1982" function
  it('returns the correct result for "imaiandTonouchi1982" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'median' };
    const soilClass = 'SP';

    // Define expected output value
    const expectedOutput = '11997.738';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imaiandTonouchi1982_2" function
  it('returns the correct result for "imaiandTonouchi1982_2" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '2400.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imaiandTonouchi1982_3" function
  it('returns the correct result for "imaiandTonouchi1982_3" function', () => {
    // Define input values
    const inputData = { N60: '22', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '2200.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imaiandYoshimura1982" function
  it('returns the correct result for "imaiandYoshimura1982" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'median' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '14080.369';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohbaandTourimi1970" function
  it('returns the correct result for "ohbaandTourimi1970" function', () => {
    // Define input values
    const inputData = { N60: '25', selectedValue: 'minimum' };
    const soilClass = 'SC';

    // Define expected output value
    const expectedOutput = '2500.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwasaki1973" function
  it('returns the correct result for "ohsakiandIwasaki1973" function', () => {
    // Define input values
    const inputData = { N60: '26', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '2600.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwasaki1973_2" function
  it('returns the correct result for "ohsakiandIwasaki1973_2" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'median' };
    const soilClass = 'SP';

    // Define expected output value
    const expectedOutput = '11997.738';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwasaki1973_3" function
  it('returns the correct result for "ohsakiandIwasaki1973_3" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'median' };
    const soilClass = 'SP';

    // Define expected output value
    const expectedOutput = '13399.926';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwasaki1973_4" function
  it('returns the correct result for "ohsakiandIwasaki1973_4" function', () => {
    // Define input values
    const inputData = { N60: '25', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '2500.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "randolph1981" function
  it('returns the correct result for "randolph1981" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'median' };
    const soilClass = 'SP';

    // Define expected output value
    const expectedOutput = '11997.738';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "wroth1979" function
  it('returns the correct result for "wroth1979" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'median' };
    const soilClass = 'SP';

    // Define expected output value
    const expectedOutput = '13399.926';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearModulus(inputData, soilClass)).to.equal(expectedOutput);
  });
});
