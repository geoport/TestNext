import calcElasticModulus from './elastic_modulus';

// Test cases for Elastic Modulus correlations with unconfinedCompressiveStrength, N60 and coneResistance inputs
describe('calcElasticModulus function', () => {
  // Test case for the "liWongChaoHatakeyama2022" function
  it('returns the correct result for "liWongChaoHatakeyama2022" function', () => {
    // Define input values
    const inputData = { unconfinedCompressiveStrength: '400', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '2772.800';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "liWongChaoHatakeyama2022_2" function
  it('returns the correct result for "liWongChaoHatakeyama2022_2" function', () => {
    // Define input values
    const inputData = { unconfinedCompressiveStrength: '500', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '3466.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "seedandIdriss1971" function
  it('returns the correct result for "seedandIdriss1971" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'median' };
    const soilClass = 'GW';

    // Define expected output value
    const expectedOutput = '3052.500';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "peck1969" function
  it('returns the correct result for "peck1969" function', () => {
    // Define input values
    const inputData = { N60: '5', selectedValue: 'minimum' };
    const soilClass = 'SC';

    // Define expected output value
    const expectedOutput = '640.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "peck1969_2" function
  it('returns the correct result for "peck1969_2" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'median' };
    const soilClass = 'SW';

    // Define expected output value
    const expectedOutput = '3052.500';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "peck1969_3" function
  it('returns the correct result for "peck1969_3" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'median' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '3052.500';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ishihara1996" function
  it('returns the correct result for "ishihara1996" function', () => {
    // Define input values
    const inputData = { coneResistance: '20000', selectedValue: 'median' };
    const soilClass = 'GW';

    // Define expected output value
    const expectedOutput = '8560.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ishihara1996_2" function
  it('returns the correct result for "ishihara1996_2" function', () => {
    // Define input values
    const inputData = { coneResistance: '10000', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '2400.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ishihara1996_3" function
  it('returns the correct result for "ishihara1996_3" function', () => {
    // Define input values
    const inputData = { coneResistance: '15000', selectedValue: 'median' };
    const soilClass = 'SC';

    // Define expected output value
    const expectedOutput = '6420.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ishihara1996_4" function
  it('returns the correct result for "ishihara1996_4" function', () => {
    // Define input values
    const inputData = { coneResistance: '5500', selectedValue: 'median' };
    const soilClass = 'ML';

    // Define expected output value
    const expectedOutput = '2354.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ishihara1996_5" function
  it('returns the correct result for "ishihara1996_5" function', () => {
    // Define input values
    const inputData = { coneResistance: '2750', selectedValue: 'median' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '1177.000';

    // Call the function with input values and check if it returns the expected output
    expect(calcElasticModulus(inputData, soilClass)).to.equal(expectedOutput);
  });
});
