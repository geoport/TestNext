import { getResult } from './helper';

/**
 * Recompression Index correlations with compressionIndex input.
 *
 * @param compressionIndex - It describes the variation of the void ratio e 
 * as a function of the change of effective stress σef plotted in the logarithmic scale. 
 * Shown as "Cc" in correlations.
 *
 * @returns calcRecompressionIndex
 */


// For Turkish clays ==> CL
function gunduzandArman(compressionIndex: string): string {
    const Cc = parseFloat(compressionIndex);
    let result = 0.0131 + 0.0254 * Cc;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(3)}`;
}

// For all clays
function gunduzandOnalp(compressionIndex: string): string {
    const Cc = parseFloat(compressionIndex);
    let result = 0.017 + 0.102 * Cc;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(3)}`;
}

export default function calcRecompressionIndex(
    inputData: any,
    soilClass: string,
): string {
    const { compressionIndex, selectedValue } = inputData;

    const results = [
        gunduzandArman(compressionIndex),
        gunduzandOnalp(compressionIndex),
    ];

    return getResult(results, selectedValue);
}
