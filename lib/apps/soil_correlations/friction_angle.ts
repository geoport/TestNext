import { getResult } from './helper';

/**
 * Friction angle correlations with N60 input.
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @returns calcFrictonAngle
 */

// For Round and well-graded OR Angular soils
function dunham1954(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (12 * sptN60) ** 1 / 2 + 20;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Coarse-grained sands
function terzaghiPeckandMesri1996(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = sptN60 / 4 + 28;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sandy soils
function wolff1989(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 0.3 * sptN60 - 0.00054 * sptN60 * sptN60 + 27.1;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sand as General Case
function shiohiandFukui1954(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (0.45 * sptN60 * 60) / 70 + 20;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sandy soils
function peck1953(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (0.3 * sptN60) ** 1 / 2 + 27;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For General Acceptable
function ohsaki1959andKishida1967(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (20 * sptN60) ** 1 / 2 + 15;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

function kampengsen(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (12 * sptN60) ** 1 / 2 + 23.3;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sandy soils with N60>5 / Phi <= 45
function jra1990(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (15 * sptN60) ** 1 / 2 + 15;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

function chonburi(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (12 * sptN60) ** 1 / 2 + 22;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

function ayuthaya(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (12 * sptN60) ** 1 / 2 + 22.8;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Friction angle correlations with N1_60 input.
 *
 * @param N1_60 - N1_60 corresponds to 60% of the theoretical free-falling
 * ram energy and the effective overlay load is the corrected impact count
 * by taking the pressure 100 kPa. in SPT. Shown as "sptN1_60" in correlations.
 *
 * @returns calcFrictonAngle
 */

// For Clean quartz to siliceous sand
function hatanakaandUchida1996(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = (20 * sptN1_60) ** 1 / 2 + 20;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// Not recommended for shallow depths
function peckHansonandThornburn1974(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = 53.881 - 27.6034 * Math.exp(-0.0147 * sptN1_60);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Friction angle correlations with relativeDensity input.
 *
 * @param relativeDensity - Relative density is the measure of compactness
 * of cohesionless soil. Shown as "Dr" in correlations. Its unit is "%".
 *
 * @returns calcFrictonAngle
 */

// For General Acceptable, Dr estimated from Yoshida, 1988
function meyerhof1959(relativeDensity: string): string {
    const Dr = parseFloat(relativeDensity);
    let result = 0.15 * Dr + 28;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Friction angle correlations with both relativeDensity and effectiveStress inputs.
 *
 * @param relativeDensity - Relative density is the measure of compactness
 * of cohesionless soil. Shown as "Dr" in correlations. Its unit is "%".
 * 
 * @param effectiveStress - Effective stress can be defined as the stress
 * that keeps soil particles together. Shown as "sv" in correlations. Its unit is "kPa".
 * 
 * @returns calcFrictonAngle
 */

// For Sands of Cu < 6
function duncan2004(relativeDensity: string, effectiveStress: string): string {
    const Dr = parseFloat(relativeDensity);
    const sv = parseFloat(effectiveStress);
    let result = 34 + (10 * Dr) / 100 - (3 + (2 * Dr) / 100) * Math.log(sv / 100);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Friction angle correlations with both N60 and effectiveStress inputs.
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 * 
 * @param effectiveStress - Effective stress can be defined as the stress
 * that keeps soil particles together. Shown as "sv" in correlations. Its unit is "kPa".
 * 
 * @returns calcFrictonAngle
 */

// For Granular soils in Taipei
function mohChinLinandWoo1989(N60: string, effectiveStress: string): string {
    const sptN60 = parseFloat(N60);
    const sv = parseFloat(effectiveStress);
    let result = 28 + 1.3 * ((0.77 * sptN60 * Math.log((195 * 9.807) / sv)) ** 1 / 2);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Friction angle correlations with both N60, effectiveStress, plasticityIndex inputs.
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 * 
 * @param effectiveStress - Effective stress can be defined as the stress
 * that keeps soil particles together. Shown as "sv" in correlations. Its unit is "kPa".
 * 
 * @param plasticityIndex - Plasticity index is expressed in percent of the
 * dry weight of the soil sample. Shown as "PI" in correlations. Its unit is "%".
 * 
 * @returns calcFrictonAngle
 */

// For Loose sands
function hettiarachchiandBrown2009(
    N60: string,
    effectiveStress: string,
    plasticityIndex: string,
): string {
    const sptN60 = parseFloat(N60);
    const sv = parseFloat(effectiveStress);
    const PI = parseFloat(plasticityIndex);
    let result = 0.383 * (Math.atan((0.2 * sptN60) / (sv / 100)) - 0.68) * (180 / PI);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Loose sands
function schmertmann1975(
    N60: string,
    effectiveStress: string,
    plasticityIndex: string,
): string {
    const sptN60 = parseFloat(N60);
    const sv = parseFloat(effectiveStress);
    const PI = parseFloat(plasticityIndex);
    let result = Math.atan(sptN60 / (12.2 + (20.3 * sv) / 100) ** 0.34) * (180 / PI);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}


export default function calcFrictionAngle(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const {
        N60,
        N1_60,
        relativeDensity,
        effectiveStress,
        plasticityIndex,
        selectedValue,
    } = inputData;
    if (N60) {
        results.push(dunham1954(N60));
        results.push(terzaghiPeckandMesri1996(N60));
        results.push(ayuthaya(N60));
        results.push(chonburi(N60));
        results.push(ohsaki1959andKishida1967(N60));
        results.push(kampengsen(N60));
        results.push(jra1990(N60));
        results.push(peck1953(N60));
        results.push(shiohiandFukui1954(N60));
        results.push(wolff1989(N60));

        if (effectiveStress) {
            results.push(mohChinLinandWoo1989(N60, effectiveStress));

            if (plasticityIndex) {
                results.push(
                    hettiarachchiandBrown2009(
                        N60,
                        effectiveStress,
                        plasticityIndex,
                    ),
                );
                results.push(
                    schmertmann1975(N60, effectiveStress, plasticityIndex),
                );
            }
        }
    }

    if (relativeDensity) {
        results.push(meyerhof1959(relativeDensity));
        if (effectiveStress) {
            results.push(duncan2004(effectiveStress, relativeDensity));
        }
    }

    if (N1_60) {
        results.push(hatanakaandUchida1996(N1_60));
        results.push(peckHansonandThornburn1974(N1_60));
    }

    return getResult(results, selectedValue);
}
