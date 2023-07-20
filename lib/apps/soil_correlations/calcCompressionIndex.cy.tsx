import calcCompressionIndex from './compression_index';

// Test cases for Compression Index correlations with liquidLimit, voidRatio and waterContent inputs
describe('calcCompressionIndex function', () => {
  // Test case for the "terzaghiandPeck1948" function
  it('returns the correct result for "terzaghiandPeck1948" function', () => {
    // Define input values
    const inputData = { liquidLimit: '50', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.190';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "skempton1944" function
  it('returns the correct result for "skempton1944" function', () => {
    // Define input values
    const inputData = { liquidLimit: '50', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.190';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "cozzolino1961" function
  it('returns the correct result for "cozzolino1961" function', () => {
    // Define input values
    const inputData = { liquidLimit: '71', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.290';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "cozzolino1961_2" function
  it('returns the correct result for "cozzolino1961_2" function', () => {
    // Define input values
    const inputData = { liquidLimit: '45', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.170';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "usace1990" function
  it('returns the correct result for "usace1990" function', () => {
    // Define input values
    const inputData = { liquidLimit: '41', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.150';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "loandLovell1982" function
  it('returns the correct result for "loandLovell1982" function', () => {
    // Define input values
    const inputData = { liquidLimit: '71', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.290';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "balasubramaniamandBrenner1981" function
  it('returns the correct result for "balasubramaniamandBrenner1981" function', () => {
    // Define input values
    const inputData = { liquidLimit: '81', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.330';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976" function
  it('returns the correct result for "azzouz1976" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.94', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976_2" function
  it('returns the correct result for "azzouz1976_2" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.52', selectedValue: 'minimum' };
    const soilClass = 'ML';

    // Define expected output value
    const expectedOutput = '0.020';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976_3" function
  it('returns the correct result for "azzouz1976_3" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.94', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "cozzolino1961_3" function
  it('returns the correct result for "cozzolino1961_3" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.94', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "nishida1956" function
  it('returns the correct result for "nishida1956" function', () => {
    // Define input values
    const inputData = { voidRatio: '1.17', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.370';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "balasubramaniamandBrenner1981_2" function
  it('returns the correct result for "balasubramaniamandBrenner1981_2" function', () => {
    // Define input values
    const inputData = { voidRatio: '1.35', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.440';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "balasubramaniamandBrenner1981_3" function
  it('returns the correct result for "balasubramaniamandBrenner1981_3" function', () => {
    // Define input values
    const inputData = { voidRatio: '1.35', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.440';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "goldberg1979" function
  it('returns the correct result for "goldberg1979" function', () => {
    // Define input values
    const inputData = { voidRatio: '1.35', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.440';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "loandLovell1982_2" function
  it('returns the correct result for "loandLovell1982_2" function', () => {
    // Define input values
    const inputData = { voidRatio: '1.35', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.440';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976_4" function
  it('returns the correct result for "azzouz1976_4" function', () => {
    // Define input values
    const inputData = { voidRatio: '0.94', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976_5" function
  it('returns the correct result for "azzouz1976_5" function', () => {
    // Define input values
    const inputData = { waterContent: '35', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.280';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "koppula1981" function
  it('returns the correct result for "koppula1981" function', () => {
    // Define input values
    const inputData = { waterContent: '35', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.280';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "usace1990andAzzouz1976" function
  it('returns the correct result for "usace1990andAzzouz1976" function', () => {
    // Define input values
    const inputData = { waterContent: '35', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.280';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "usace1990_2" function
  it('returns the correct result for "usace1990_2" function', () => {
    // Define input values
    const inputData = { waterContent: '34', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "azzouz1976_6" function
  it('returns the correct result for "azzouz1976_6" function', () => {
    // Define input values
    const inputData = { waterContent: '35', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.280';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "loandLovell1982_3" function
  it('returns the correct result for "loandLovell1982_3" function', () => {
    // Define input values
    const inputData = { waterContent: '43', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.380';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "balasubramaniamandBrenner1981_4" function
  it('returns the correct result for "balasubramaniamandBrenner1981_4" function', () => {
    // Define input values
    const inputData = { waterContent: '46', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.410';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "balasubramaniamandBrenner1981_5" function
  it('returns the correct result for "balasubramaniamandBrenner1981_5" function', () => {
    // Define input values
    const inputData = { waterContent: '46', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '0.410';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "usace1990_3" function
  it('returns the correct result for "usace1990_3" function', () => {
    // Define input values
    const inputData = { waterContent: '35', voidRatio: '0.97', selectedValue: 'median' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '0.342';

    // Call the function with input values and check if it returns the expected output
    expect(calcCompressionIndex(inputData, soilClass)).to.equal(expectedOutput);
  });

});
