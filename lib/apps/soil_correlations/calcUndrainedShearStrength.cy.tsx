import calcUndrainedShearStrength from './undrained_shear_strength';

// Test cases for Undrained Shear Strength correlations with shearWaveVelocity input
describe('calcUndrainedShearStrength function', () => {
  // Test case for the "kulkarni2010" function
  it('returns the correct result for "kulkarni2010" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "heureuxandLong" function
  it('returns the correct result for "heureuxandLong" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "dickenson1994" function
  it('returns the correct result for "dickenson1994" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '100', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '1.630';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "blakeandGilbert1997" function
  it('returns the correct result for "blakeandGilbert1997" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "yun2006" function
  it('returns the correct result for "yun2006" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '240', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '5.490';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "taboada2013" function
  it('returns the correct result for "taboada2013" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "agaibyandMayne2015" function
  it('returns the correct result for "agaibyandMayne2015" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "andersen2004" function
  it('returns the correct result for "andersen2004" function', () => {
    // Define input values
    const inputData = { shearWaveVelocity: '180', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '3.680';

    // Call the function with input values and check if it returns the expected output
    expect(calcUndrainedShearStrength(inputData, soilClass)).to.equal(expectedOutput);
  });
});
