import calcVolumeCompressibilityCoefficient from './volume_compressibility_coefficient';

// Test cases for Volume Compressibility Coefficient correlations with compressionIndex, voidRatio, N60 and plasticityIndex inputs
describe('calcVolumeCompressibilityCoefficient function', () => {
  // Test case for the "terzaghi1943" function
  it('returns the correct result for "terzaghi1943" function', () => {
    // Define input values
    const inputData = { compressionIndex: '0.3', voidRatio: '0.4', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.002';

    // Call the function with input values and check if it returns the expected output
    expect(calcVolumeCompressibilityCoefficient(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "skempton1951" function
  it('returns the correct result for "skempton1951" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.013';

    // Call the function with input values and check if it returns the expected output
    expect(calcVolumeCompressibilityCoefficient(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "stroud1974" function
  it('returns the correct result for "stroud1974" function', () => {
    // Define input values
    const inputData = { N60: '24', plasticityIndex: '15', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.007';

    // Call the function with input values and check if it returns the expected output
    expect(calcVolumeCompressibilityCoefficient(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "stroud1974_2" function
  it('returns the correct result for "stroud1974_2" function', () => {
    // Define input values
    const inputData = { N60: '24', plasticityIndex: '50', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.009';

    // Call the function with input values and check if it returns the expected output
    expect(calcVolumeCompressibilityCoefficient(inputData, soilClass)).to.equal(expectedOutput);
  });

});
