import calcFrictionAngle from './friction_angle';

// Test cases for Friction Angle correlations with N60, N1_60, relativeDensity, effectiveStress and  plasticityIndex inputs
describe('calcFrictionAngle function', () => {
  // Test case for the "dunham1954" function
  it('returns the correct result for "dunham1954" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '29.260';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "terzaghiPeckandMesri1996" function
  it('returns the correct result for "terzaghiPeckandMesri1996" function', () => {
    // Define input values
    const inputData = { N60: '30', selectedValue: 'minimum' };
    const soilClass = 'GM';

    // Define expected output value
    const expectedOutput = '31.500';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "wolff1989" function
  it('returns the correct result for "wolff1989" function', () => {
    // Define input values
    const inputData = { N60: '13', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '25.010';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "shiohiandFukui1954" function
  it('returns the correct result for "shiohiandFukui1954" function', () => {
    // Define input values
    const inputData = { N60: '20', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '27.710';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "peck1953" function
  it('returns the correct result for "peck1953" function', () => {
    // Define input values
    const inputData = { N60: '24', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '29.260';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ohsaki1959andKishida1967" function
  it('returns the correct result for "ohsaki1959andKishida1967" function', () => {
    // Define input values
    const inputData = { N60: '21', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '28.100';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "kampengsen" function
  it('returns the correct result for "kampengsen" function', () => {
    // Define input values
    const inputData = { N60: '20', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '27.710';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "jra1990" function
  it('returns the correct result for "jra1990" function', () => {
    // Define input values
    const inputData = { N60: '27', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '30.410';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "chonburi" function
  it('returns the correct result for "chonburi" function', () => {
    // Define input values
    const inputData = { N60: '28', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '30.800';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "ayuthaya" function
  it('returns the correct result for "ayuthaya" function', () => {
    // Define input values
    const inputData = { N60: '18', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '26.940';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "hatanakaandUchida1996" function
  it('returns the correct result for "hatanakaandUchida1996" function', () => {
    // Define input values
    const inputData = { N1_60: '40', selectedValue: 'minimum' };
    const soilClass = 'SW';

    // Define expected output value
    const expectedOutput = '38.550';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "peckHansonandThornburn1974" function
  it('returns the correct result for "peckHansonandThornburn1974" function', () => {
    // Define input values
    const inputData = { N1_60: '31', selectedValue: 'minimum' };
    const soilClass = 'SC';

    // Define expected output value
    const expectedOutput = '36.380';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "meyerhof1959" function
  it('returns the correct result for "meyerhof1959" function', () => {
    // Define input values
    const inputData = { relativeDensity: '88', selectedValue: 'minimum' };
    const soilClass = 'GW';

    // Define expected output value
    const expectedOutput = '41.200';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "duncan2004" function
  it('returns the correct result for "duncan2004" function', () => {
    // Define input values
    const inputData = { relativeDensity: '85', effectiveStress: '100', selectedValue: 'minimum' };
    const soilClass = 'GW';

    // Define expected output value
    const expectedOutput = '40.750';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "mohChinLinandWoo1989" function
  it('returns the correct result for "mohChinLinandWoo1989" function', () => {
    // Define input values
    const inputData = { N60: '24', effectiveStress: '100', selectedValue: 'minimum' };
    const soilClass = 'SW';

    // Define expected output value
    const expectedOutput = '29.260';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "hettiarachchiandBrown2009" function
  it('returns the correct result for "hettiarachchiandBrown2009" function', () => {
    // Define input values
    const inputData = { N60: '18', effectiveStress: '100', plasticityIndex: '0.4', selectedValue: 'minimum' };
    const soilClass = 'SC';

    // Define expected output value
    const expectedOutput = '26.940';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });

  // Test case for the "schmertmann1975" function
  it('returns the correct result for "schmertmann1975" function', () => {
    // Define input values
    const inputData = { N60: '20', effectiveStress: '100', plasticityIndex: '0.8', selectedValue: 'minimum' };
    const soilClass = 'SM';

    // Define expected output value
    const expectedOutput = '27.710';

    // Call the function with input values and check if it returns the expected output
    expect(calcFrictionAngle(inputData, soilClass)).to.equal(expectedOutput);
  });
});
