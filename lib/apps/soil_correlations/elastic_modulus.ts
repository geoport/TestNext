import { getResult } from './helper';

/**
 * Elastic Modulus correlations with unconfinedCompressiveStrength input. The output unit is "t/m2".
 *
 * @param unconfinedCompressiveStrength - It stands for the maximum axial compressive stress 
 * that a cohesive soil specimen can bear under zero confining stress. 
 * Shown as "qu" in correlations. Its unit is "kPa".
 *
 * @returns calcElasticModulus
 */

// For Bangkok sandy soils
function liWongChaoHatakeyama2022(
    unconfinedCompressiveStrength: string,
): string {
    const qu = parseFloat(unconfinedCompressiveStrength);
    let result = (69.32 * qu) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Bangkok clayey soils
function liWongChaoHatakeyama2022_2(
    unconfinedCompressiveStrength: string,
): string {
    const qu = parseFloat(unconfinedCompressiveStrength);
    let result = (80.83 * qu) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Elastic Modulus correlations with N60 input. The output unit is "t/m2".
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @returns calcElasticModulus
 */

// For Gravels and dense sands ==> GW - GP - GM - GC - SW - SP
function seedandIdriss1971(
    N60: string,
): string {
    const sptN60 = parseFloat(N60);
    let result = (15000 + 900 * sptN60) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clayey sands ==> SC
function peck1969(
    N60: string,
): string {
    const sptN60 = parseFloat(N60);
    let result = (320 * (sptN60 + 15)) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For gravelly sands ==> SW - SP
function peck1969_2(
    N60: string,
): string {
    const sptN60 = parseFloat(N60);
    let result = (1200 * (sptN60 + 6)) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For silty sands ==> SM
function peck1969_3(
    N60: string,
): string {
    const sptN60 = parseFloat(N60);
    let result = (500 * (sptN60 + 15)) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Elastic Modulus correlations with coneResistance input. The output unit is "t/m2".
 *
 * @param coneResistance - Cone resistance is measuring the force required to push 
 * a cone-shaped probe with a standardized cross-sectional area into the soil at a
 * constant rate of penetration. Shown as "qc" in correlations. Its unit is "kPa".
 *
 * @returns calcElasticModulus
 */

// For Gravels and dense sands ==> GW - GP - GM - GC - SW - SP
function ishihara1996(
    coneResistance: string,
): string {
    const qc = parseFloat(coneResistance);
    let result = (5.5 * qc) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For silty sands ==> SM
function ishihara1996_2(
    coneResistance: string,
): string {
    const qc = parseFloat(coneResistance);
    let result = (2.5 * qc) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clayey sands ==> SC
function ishihara1996_3(
    coneResistance: string,
): string {
    const qc = parseFloat(coneResistance);
    let result = (4.5 * qc) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For silts ==> ML - MH
function ishihara1996_4(
    coneResistance: string,
): string {
    const qc = parseFloat(coneResistance);
    let result = (2.4 * qc) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays ==> CL - CH
function ishihara1996_5(
    coneResistance: string,
): string {
    const qc = parseFloat(coneResistance);
    let result = (6.5 * qc) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}



export default function calcElasticModulus(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const {
        unconfinedCompressiveStrength,
        N60,
        coneResistance,
        //shearModulus,
        selectedValue,
    } = inputData;
    if (unconfinedCompressiveStrength) {
        results.push(liWongChaoHatakeyama2022(unconfinedCompressiveStrength));
        results.push(liWongChaoHatakeyama2022_2(unconfinedCompressiveStrength));
    }

    if (N60) {
        results.push(seedandIdriss1971(N60));
        results.push(peck1969(N60));
        results.push(peck1969_2(N60));
        results.push(peck1969_3(N60));
    }

    if (coneResistance) {
        results.push(ishihara1996(coneResistance));
        results.push(ishihara1996_2(coneResistance));
        results.push(ishihara1996_3(coneResistance));
        results.push(ishihara1996_4(coneResistance));
        results.push(ishihara1996_5(coneResistance));
    }

    return getResult(results, selectedValue);
}

