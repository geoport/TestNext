import calcShearWaveVelocity from './shear_wave_velocity';

// Test cases for Shear Wave Velocity correlations with N60, undrainedShearStrength and N1_60 inputs
describe('calcShearWaveVelocity function', () => {
  // Test case for the "imai1977" function
  it('returns the correct result for "imai1977" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imai1977_2" function
  it('returns the correct result for "imai1977_2" function', () => {
    // Define input values
    const inputData = { N60: '18', selectedValue: 'median' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '261.225';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "sykoraandStokoe1983" function
  it('returns the correct result for "sykoraandStokoe1983" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '146.230';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "okamoto1989" function
  it('returns the correct result for "okamoto1989" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "pitilakis1999" function
  it('returns the correct result for "pitilakis1999" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'median' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '320.009';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "pitilakis1999_2" function
  it('returns the correct result for "pitilakis1999_2" function', () => {
    // Define input values
    const inputData = { N60: '26', selectedValue: 'median' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '302.089';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "pitilakis1999_3" function
  it('returns the correct result for "pitilakis1999_3" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'minimum' };
    const soilClass = 'GM';

    // Define expected output value
    const expectedOutput = '146.230';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "hasancebiandUlusay2007" function
  it('returns the correct result for "hasancebiandUlusay2007" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "hasancebiandUlusay2007_2" function
  it('returns the correct result for "hasancebiandUlusay2007_2" function', () => {
    // Define input values
    const inputData = { N60: '25', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '131.070';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "dikmen2009" function
  it('returns the correct result for "dikmen2009" function', () => {
    // Define input values
    const inputData = { N60: '27', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '137.270';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "dikmen2009_2" function
  it('returns the correct result for "dikmen2009_2" function', () => {
    // Define input values
    const inputData = { N60: '15', selectedValue: 'median' };
    const soilClass = 'ML';

    // Define expected output value
    const expectedOutput = '243.402';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "dikmen2009_3" function
  it('returns the correct result for "dikmen2009_3" function', () => {
    // Define input values
    const inputData = { N60: '14', selectedValue: 'median' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '237.033';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "yokota1991" function
  it('returns the correct result for "yokota1991" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "imaiandYoshimura1970" function
  it('returns the correct result for "imaiandYoshimura1970" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "jaferi1997" function
  it('returns the correct result for "jaferi1997" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "jaferiShafieeandRazmkbah2002" function
  it('returns the correct result for "jaferiShafieeandRazmkbah2002" function', () => {
    // Define input values
    const inputData = { N60: '20', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '114.650';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "jra1980" function
  it('returns the correct result for "jra1980" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "lee1990" function
  it('returns the correct result for "lee1990" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'CL';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "kanai1966" function
  it('returns the correct result for "kanai1966" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "maheswariBoominathanandDodagoudar" function
  it('returns the correct result for "maheswariBoominathanandDodagoudar" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "nareshandBellena" function
  it('returns the correct result for "nareshandBellena" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "nareshandBellena_2" function
  it('returns the correct result for "nareshandBellena_2" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsakiandIwazaki1973" function
  it('returns the correct result for "ohsakiandIwazaki1973" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "seedandIdriss" function
  it('returns the correct result for "seedandIdriss" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '140.300';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "sisman1995" function
  it('returns the correct result for "sisman1995" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'GC';

    // Define expected output value
    const expectedOutput = '187.340';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "athanasopoulos1995" function
  it('returns the correct result for "athanasopoulos1995" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'GC';

    // Define expected output value
    const expectedOutput = '187.340';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "athanasopoulos1995_2" function
  it('returns the correct result for "athanasopoulos1995_2" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'GC';

    // Define expected output value
    const expectedOutput = '187.340';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "fijiwara1972" function
  it('returns the correct result for "fijiwara1972" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'GC';

    // Define expected output value
    const expectedOutput = '187.340';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "kiku2001" function
  it('returns the correct result for "kiku2001" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'GC';

    // Define expected output value
    const expectedOutput = '187.340';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "dickenson1994" function
  it('returns the correct result for "dickenson1994" function', () => {
    // Define input values
    const inputData = { undrainedShearStrength: '30', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '115.710';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "taboada2013" function
  it('returns the correct result for "taboada2013" function', () => {
    // Define input values
    const inputData = { undrainedShearStrength: '40', selectedValue: 'minimum' };
    const soilClass = 'CH';

    // Define expected output value
    const expectedOutput = '132.650';

    // Call the function with input values and check if it returns the expected output
    expect(calcShearWaveVelocity(inputData, soilClass)).to.equal(expectedOutput);
  });
});
