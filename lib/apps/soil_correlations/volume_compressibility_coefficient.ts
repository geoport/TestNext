import { getResult } from './helper';

/**
 * Volume compressibility coefficient correlations with both compressionIndex and voidRatio inputs. The output unit is "m2/t".
 *
 * @param compressionIndex - It describes the variation of the void ratio e
 * as a function of the change of effective stress σef plotted in the logarithmic scale.
 * Shown as "Cc" in correlations.
 *
 * @param voidRatio - Voids ratio is defined as the volume of voids divided
 * by the volume of solids. Shown as "e0" in correlations.
 *
 * @returns calcVolumeCompressibilityCoefficient
 */

// For all soils
function terzaghi1943(compressionIndex: string, voidRatio: string): string {
    const Cc = parseFloat(compressionIndex);
    const e0 = parseFloat(voidRatio);
    let result = Cc * (0.0075 + 0.00025 * e0);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(6)}`;
}

/**
 * Volume compressibility coefficient correlations with N60 input. The output unit is "m2/t".
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @returns calcVolumeCompressibilityCoefficient
 */

// For clays and silts (generally for CH)
function skempton1951(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = 0.000055 * sptN60 * 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(6)}`;
}

/**
 * Volume compressibility coefficient correlations with both N1_60 and plasticityIndex inputs. The output unit is "m2/t".
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @param plasticityIndex - Plasticity index is expressed in percent of the
 * dry weight of the soil sample. Shown as "PI" in correlations. Its unit is "%".
 *
 * @returns calcVolumeCompressibilityCoefficient
 */

// For fine grained soils as mv for PI=15%  ==>  CL - ML - OL
function stroud1974(N60: string, plasticityIndex: string): string {
    const sptN60 = parseFloat(N60);
    const PI = parseFloat(plasticityIndex);
    let result = (1 / (1198.3 * PI ** -0.254 * sptN60)) * 100;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(6)}`;
}

// For fine grained soils as mv for PI=50%  ==>  CH - MH - OH
function stroud1974_2(N60: string, plasticityIndex: string): string {
    const sptN60 = parseFloat(N60);
    const PI = parseFloat(plasticityIndex);
    let result = (1 / (1198.3 * PI ** -0.254 * sptN60)) * 100;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(6)}`;
}

export default function calcVolumeCompressibilityCoefficient(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const { N60, compressionIndex, voidRatio, plasticityIndex, selectedValue } =
        inputData;
    if (compressionIndex && voidRatio) {
        results.push(terzaghi1943(compressionIndex, voidRatio));
    }
    if (N60) {
        results.push(skempton1951(N60));
    }
    if (N60 && plasticityIndex) {
        results.push(stroud1974(N60, plasticityIndex));
        results.push(stroud1974_2(N60, plasticityIndex));
    }

    return getResult(results, selectedValue);
}
