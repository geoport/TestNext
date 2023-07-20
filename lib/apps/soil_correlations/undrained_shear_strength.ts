import { getResult } from './helper';

/**
 * Undrained shear strength correlations with shearWaveVelocity input. The output unit is "t/m2".
 *
 * @param shearWaveVelocity - Shear wave velocity is the speed at which shear waves 
 * propagate through soil and is used to determine soil stiffness and elastic modulus. 
 * Shown as "VS" in correlations. Its unit is "m/s".
 *
 * @returns calcUndrainedShearStrength
 */

// For Indian coastal soils (130 tests, R2 ¼ 0.82) ==> CH
function kulkarni2010(shearWaveVelocity: string): string {
    if (shearWaveVelocity) {
        const VS = parseFloat(shearWaveVelocity);
        let result = (0.0005 * (VS ** 2.5)) / 10;
        if (result < 0) {
            result = 0;
        }
        return `${result.toFixed(2)}`;
    } else {
        return '';
    }
}

function heureuxandLong(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (0.021 * VS ** 1.52) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For San Francisco bay clay ==> CH
function dickenson1994(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (VS / 23) ** (1 / 0.475) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Offshore NW United States (55 tests) ==> CL
function blakeandGilbert1997(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (1.87 * VS ** 1.12) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Gulf of Mexico (38 tests) ==> CL
function yun2006(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (VS / 19.4) ** (1 / 0.36) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Bay of Campeche clay ==> CH
function taboada2013(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (VS / 31) ** (1 / 0.414) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Worldwide soils (360 tests, R2 ¼ 0.76)
function agaibyandMayne2015(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (0.152 * VS ** 1.142) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sensitive and quick clays (remolded strength; sur < 0.5 kPa) ==> CH
function andersen2004(shearWaveVelocity: string): string {
    const VS = parseFloat(shearWaveVelocity);
    let result = (0.027 * VS ** 1.39) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

export default function calcUndrainedShearStrength(
    inputData: any,
    soilClass: string,
): string {
    const { shearWaveVelocity, selectedValue } = inputData;

    const results = [
        kulkarni2010(shearWaveVelocity),
        heureuxandLong(shearWaveVelocity),
        dickenson1994(shearWaveVelocity),
        blakeandGilbert1997(shearWaveVelocity),
        yun2006(shearWaveVelocity),
        taboada2013(shearWaveVelocity),
        agaibyandMayne2015(shearWaveVelocity),
        andersen2004(shearWaveVelocity),
    ];

    return getResult(results, selectedValue);
}
