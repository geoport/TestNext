import { getResult } from './helper';

/**
 * Undrained Modulus correlations with undrainedShearStrength input. The output unit is "t/m2".
 *
 * @param undrainedShearStrength - It is the shear strength of a soil in a condition where there 
 * is no drainage of pore water during shear deformation. Shown as "Cu" in correlations. Its unit is "kPa".
 *
 * @returns calcUndrainedModulus
 */

// For stiff, consolidated clays ==> CL
function strozykandTankiewicz2016(undrainedShearStrength: string): string {
    const Cu = parseFloat(undrainedShearStrength);
    let result = (59.566 * Cu * Cu + 10.273 * Cu + 1.398) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Undrained Modulus correlations with effectiveStress input. The output unit is "t/m2".
 *
 * @param effectiveStress - Effective stress can be defined as the stress
 * that keeps soil particles together. Shown as "sv" in correlations. Its unit is "kPa".
 *
 * @returns calcUndrainedModulus
 */

// For stiff, consolidated clays ==> CL
function strozykandTankiewicz2016_2(effectiveStress: string): string {
    const sv = parseFloat(effectiveStress);
    let result = (0.005 * sv + 3.652) * 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

export default function calcUndrainedModulus(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const { undrainedShearStrength, effectiveStress, selectedValue } =
        inputData;
    if (undrainedShearStrength) {
        results.push(strozykandTankiewicz2016(undrainedShearStrength));
    }
    if (effectiveStress) {
        results.push(strozykandTankiewicz2016_2(effectiveStress));
    }

    return getResult(results, selectedValue);
}
