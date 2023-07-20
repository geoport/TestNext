import { getResult } from './helper';

/**
 * Poissons Ratio correlations with frictionAngle input.
 *
 * @param frictionAngle - It is a shear strength parameter of soils. Its definition is derived 
 * from the Mohr-Coulomb failure criterion and it is used to describe the friction shear resistance
 * of soils together with the normal effective stress. Shown as "phi" in correlations.
 *
 * @returns calcPoissonsRatio
 */

// For granular soils
function kulhawyandMayne1990(frictionAngle: string): string {
    const phi = parseFloat(frictionAngle);
    let result = 0.1 + 0.3 * ((phi - 25) / 20);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Poissons Ratio correlations with voidRatio input.
 *
 * @param voidRatio - Voids ratio is defined as the volume of voids divided
 * by the volume of solids. Shown as "e0" in correlations.
 *
 * @returns calcPoissonsRatio
 */

// For Granular soils, especially SM (GM except)
function seongyoonSeokchoelYuyongMyeonghwan2020(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.1811 * e0 + 0.1649;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Fine soils, especially ML and CL
function seongyoonSeokchoelYuyongMyeonghwan2020_2(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.3664 * e0 + 0.074;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Poissons Ratio correlations with shearModulus input.
 *
 * @param shearModulus - The shear modulus is the soils material response to the shear deformation. 
 * It is defined as the ratio of shear stress and shear strain. Shown as "G" in correlations. Its unit is "kPa".
 *
 * @returns calcPoissonsRatio
 */

// For Cohesionless soils
function ohsakiandIwasaki1973(shearModulus: string): string {
    const G = parseFloat(shearModulus);
    let result = 0.2 + 0.3 * ((1 - (((Math.log10(G - 2)) ** 2) / 16)) ** 1/2);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


/**
 * Poissons Ratio correlations with effectiveStress input.
 *
 * @param effectiveStress - Effective stress can be defined as the stress
 * that keeps soil particles together. Shown as "sv" in correlations. Its unit is "kPa".
 *
 * @returns calcPoissonsRatio
 */

// For Soft clays ==> CH
function zhang2002(effectiveStress: string): string {
    const sv = parseFloat(effectiveStress);
    let result = 0.15 + 0.0025 * sv;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Soft clays ==> CH
function mayne2007(effectiveStress: string): string {
    const sv = parseFloat(effectiveStress);
    let result = 0.38 - 0.0006 * sv;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}




export default function calcPoissonsRatio(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const {
        frictionAngle,
        voidRatio,
        shearModulus,
        effectiveStress,
        selectedValue,
    } = inputData;
    if (frictionAngle) {
        results.push(kulhawyandMayne1990(frictionAngle));
    }

    if (voidRatio) {
        results.push(seongyoonSeokchoelYuyongMyeonghwan2020(voidRatio));
        results.push(seongyoonSeokchoelYuyongMyeonghwan2020_2(voidRatio));
    }

    if (shearModulus) {
        results.push(ohsakiandIwasaki1973(shearModulus));
    }

    if (effectiveStress) {
        results.push(zhang2002(effectiveStress));
        results.push(mayne2007(effectiveStress));
    }

    return getResult(results, selectedValue);
}

