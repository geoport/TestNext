import { getResult } from './helper';

/**
 * Shear wave velocity correlations with N60 input. The output unit is "m/s".
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @returns calcShearWaveVelocity
 */

// For all soils
function imai1977(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 91 * sptN60 ** 0.337;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function imai1977_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 80.2 * sptN60 ** 0.292;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For sands
function sykoraandStokoe1983(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 100.5 * sptN60 ** 0.29;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For sands
function okamoto1989(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 125 * sptN60 ** 0.3;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For sands
function pitilakis1999(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 145 * sptN60 ** 0.178;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function pitilakis1999_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 132 * sptN60 ** 0.271;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For gravels
function pitilakis1999_3(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 217 * sptN60 ** 0.5;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For sands
function hasancebiandUlusay2007(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 90.82 * sptN60 ** 0.319;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function hasancebiandUlusay2007_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 97.89 * sptN60 ** 0.269;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For sands
function dikmen2009(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 73 * sptN60 ** 0.33;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For silts
function dikmen2009_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 60 * sptN60 ** 0.36;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function dikmen2009_3(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 44 * sptN60 ** 0.48;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function yokota1991(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 121 * sptN60 ** 0.27;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function imaiandYoshimura1970(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 76 * sptN60 ** 0.33;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function jaferi1997(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 22 * sptN60 ** 0.85;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Fine grained soils in Tahran ==> CL - CH - ML - MH - CL&ML
function jaferiShafieeandRazmkbah2002(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 19 * sptN60 ** 0.85;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function jra1980(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 100 * sptN60 ** 0.3333;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function lee1990(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 144.43 * sptN60 ** 0.31;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function kanai1966(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 19 * sptN60 ** 0.6;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function maheswariBoominathanandDodagoudar(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 95.64 * sptN60 ** 0.301;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function nareshandBellena(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 126.395 * sptN60 ** 0.223;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function nareshandBellena_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 122.945 * sptN60 ** 0.26;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function ohsakiandIwazaki1973(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 59 * sptN60 ** 0.47;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function seedandIdriss(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 61.4 * sptN60 ** 0.5;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Shear wave velocity correlations with N1_60 input. The output unit is "m/s".
 *
 * @param N1_60 - N1.60 corresponds to 60% of the theoretical free-falling
 * ram energy and the effective overlay load is the corrected impact count
 * by taking the pressure 100 kPa. in SPT. Shown as "sptN1_60" in correlations.
 *
 * @returns calcShearWaveVelocity
 */

// For all soils
function sisman1995(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 32.8 * sptN1_60 ** 0.51;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function athanasopoulos1995(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 107.6 * sptN1_60 ** 0.36;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays
function athanasopoulos1995_2(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 76.55 * sptN1_60 ** 0.445;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function fijiwara1972(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 92.1 * sptN1_60 ** 0.337;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function kiku2001(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 63.8 * sptN1_60 ** 0.292;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Shear wave velocity correlations with undrainedShearStrength input. The output unit is "m/s".
 *
 * @param undrainedShearStrength - It is the shear strength of a soil in a condition where there 
 * is no drainage of pore water during shear deformation. Shown as "Cu" in correlations. Its unit is "kPa".
 *
 * @returns calcShearWaveVelocity
 */

// For San Francisco Bay clays ==> CH
function dickenson1994(undrainedShearStrength: string): string {
    const Cu = parseFloat(undrainedShearStrength);
    let result = 23 * Cu ** 0.475;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Bay of Campeche clays ==> CH
function taboada2013(undrainedShearStrength: string): string {
    const Cu = parseFloat(undrainedShearStrength);
    let result = 31 * Cu ** 0.414;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}



export default function calcShearWaveVelocity(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const {
        N60,
        undrainedShearStrength,
        N1_60,
        selectedValue,
    } = inputData;
    if (N60) {
        results.push(imai1977(N60));
        results.push(imai1977_2(N60));
        results.push(sykoraandStokoe1983(N60));
        results.push(okamoto1989(N60));
        results.push(pitilakis1999(N60));
        results.push(pitilakis1999_2(N60));
        results.push(pitilakis1999_3(N60));
        results.push(hasancebiandUlusay2007(N60));
        results.push(hasancebiandUlusay2007_2(N60));
        results.push(dikmen2009(N60));
        results.push(dikmen2009_2(N60));
        results.push(dikmen2009_3(N60));
        results.push(yokota1991(N60));
        results.push(imaiandYoshimura1970(N60));
        results.push(jaferi1997(N60));
        results.push(jaferiShafieeandRazmkbah2002(N60));
        results.push(jra1980(N60));
        results.push(lee1990(N60));
        results.push(kanai1966(N60));
        results.push(maheswariBoominathanandDodagoudar(N60));
        results.push(nareshandBellena(N60));
        results.push(nareshandBellena_2(N60));
        results.push(ohsakiandIwazaki1973(N60));
        results.push(seedandIdriss(N60));
    }

    if (undrainedShearStrength) {
        results.push(dickenson1994(undrainedShearStrength));
        results.push(taboada2013(undrainedShearStrength));
    }

    if (N1_60) {
        results.push(sisman1995(N1_60));
        results.push(athanasopoulos1995(N1_60));
        results.push(athanasopoulos1995_2(N1_60));
        results.push(fijiwara1972(N1_60));
        results.push(kiku2001(N1_60));
    }

    return getResult(results, selectedValue);
}
