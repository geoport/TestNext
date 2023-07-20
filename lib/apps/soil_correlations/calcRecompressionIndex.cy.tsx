import calcRecompressionIndex from './recompression_index';

// Test cases for Recompression Index correlations with compressionIndex input
describe('calcRecompressionIndex function', () => {
  // Test case for the "gunduzandArman" function
  it('returns the correct result for "gunduzandArman" function', () => {
    // Define input values
    const inputData = { compressionIndex: '0.3', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.021';

    // Call the function with input values and check if it returns the expected output
    expect(calcRecompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "gunduzandOnalp" function
  it('returns the correct result for "gunduzandOnalp" function', () => {
    // Define input values
    const inputData = { compressionIndex: '0.65', selectedValue: 'median' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.057';

    // Call the function with input values and check if it returns the expected output
    expect(calcRecompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

});
