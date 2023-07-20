import calcPoissonsRatio from './poissons_ratio';

// Test cases for Poissons Ratio correlations with frictionAngle, voidRatio, shearModulus and effectiveStress inputs
describe('calcPoissonsRatio function', () => {
  // Test case for the "kulhawyandMayne1990" function
  it('returns the correct result for "kulhawyandMayne1990" function', () => {
    // Define input values
    const inputData = { frictionAngle: '30.54', selectedValue: 'minimum' };
    const soilClass = 'GM';

    // Define expected output value
    const expectedOutput = '0.180';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "seongyoonSeokchoelYuyongMyeonghwan2020" function
  it('returns the correct result for "seongyoonSeokchoelYuyongMyeonghwan2020" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.29', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '0.180';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "seongyoonSeokchoelYuyongMyeonghwan2020_2" function
  it('returns the correct result for "seongyoonSeokchoelYuyongMyeonghwan2020_2" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.41', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.220';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwasaki1973" function
  it('returns the correct result for "ohsakiandIwasaki1973" function', () => {
    // Define input values
    const inputData = { shearModulus: '1823.38', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '0.250';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "zhang2002" function
  it('returns the correct result for "zhang2002" function', () => {
    // Define input values
    const inputData = { effectiveStress: '100', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.320';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "mayne2007" function
  it('returns the correct result for "mayne2007" function', () => {
    // Define input values
    const inputData = { effectiveStress: '100', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.320';

    // Call the function with input values and check if it returns the expected output
    expect(calcPoissonsRatio(inputData, soilClass)).to.equal(expectedOutput);
  });
});
