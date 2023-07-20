import { getResult } from './helper';

/**
 * Compression Index correlations with liquidLimit input.
 *
 * @param liquidLimit - Liquid limit is the water content where the soil starts
 * to behave as a liquid. Shown as "LL" in correlations. Its unit is "%".
 *
 * @returns calcCompressionIndex
 */

// For Undisturbed clay of sensitivity less than 4 ==> CL
function terzaghiandPeck1948(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.009 * (LL - 10);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Remoulded clays ==> CL
function skempton1944(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.007 * (LL - 10);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Sao Paulo, Brazil clays ==> CH
function cozzolino1961(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.0046 * (LL - 9);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Soft silty Brazilian clays ==> CL
function cozzolino1961_2(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.0186 * (LL - 30);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all clays
function usace1990(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.01 * (LL - 13);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Indiana soils ==> CH
function loandLovell1982(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.008 * (LL - 8.2);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Weathered & soft Bangkok clays ==> CH
function balasubramaniamandBrenner1981(liquidLimit: string): string {
    const LL = parseFloat(liquidLimit);
    let result = 0.21 + (0.008 * LL);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Compression Index correlations with voidRatio input.
 *
 * @param voidRatio - Voids ratio is defined as the volume of voids divided
 * by the volume of solids. Shown as "e0" in correlations.
 *
 * @returns calcCompressionIndex
 */

// For all clays
function azzouz1976(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 1.15 * (e0 - 0.35);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For soils of very low plasticity
function azzouz1976_2(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.75 * (e0 - 0.50);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays from Greece & parts of US ==> CL
function azzouz1976_3(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.4 * (e0 - 0.25);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Brazilian clays ==> CL
function cozzolino1961_3(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.43 * (e0 - 0.84) + 0.256;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all clays
function nishida1956(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.54 * (e0 - 0.35);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Weathered and soft Bangkok clays ==> CH
function balasubramaniamandBrenner1981_2(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.22 + 0.29 * e0;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For French clays ==> CH
function balasubramaniamandBrenner1981_3(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.575 * e0 - 0.241;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Indiana soils ==> CH
function goldberg1979(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.5363 * (e0 - 0.411);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Indiana soils ==> CH
function loandLovell1982_2(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.496 * e0 - 0.195;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For clays from Greece & parts of US ==> CL
function azzouz1976_4(voidRatio: string): string {
    const e0 = parseFloat(voidRatio);
    let result = 0.4 * (e0 - 0.25);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Compression Index correlations with waterContent input.
 *
 * @param waterContent - Water content is the ratio of the weight of water to the weight of
 * the solids in a given mass of soil. Shown as "Wn" in correlations. Its unit is "%".
 *
 * @returns calcCompressionIndex
 */

// For Chicago clays ==> CL
function azzouz1976_5(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.0126 * Wn - 0.162;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Canada clays ==> CL
function koppula1981(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.01 * Wn;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For organic soils, peat
function usace1990andAzzouz1976(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.0115 * Wn;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all clays
function usace1990_2(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.012 * Wn;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Clays from Greece & parts of US ==> CL
function azzouz1976_6(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.01 * (Wn - 5);
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Indiana soils ==> CH
function loandLovell1982_3(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.0126 * Wn - 0.162;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For Weathered soft Bangkok clays ==> CH
function balasubramaniamandBrenner1981_4(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.008 * Wn + 0.2;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For French clays ==> CH
function balasubramaniamandBrenner1981_5(waterContent: string): string {
    const Wn = parseFloat(waterContent);
    let result = 0.0147 * Wn - 0.213;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Compression Index correlations with both waterContent and voidRatio inputs.
 *
 * @param waterContent - Water content is the ratio of the weight of water to
 * the weight of the solids in a given mass of soil. Shown as "Wn" in correlations. Its unit is "%".
 *
 * @param voidRatio - Voids ratio is defined as the volume of voids divided
 * by the volume of solids. Shown as "e0" in correlations.
 *
 * @returns calcCompressionIndex
 */

// For varved clays ==> CL
function usace1990_3(waterContent: string, voidRatio: string): string {
    const Wn = parseFloat(waterContent);
    const e0 = parseFloat(voidRatio);
    let result = (1 + e0) * (0.1 + 0.006 * (Wn - 25));
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

export default function calcCompressionIndex(
    inputData: any,
    soilClass: string,
): string {
    const results = [];
    const { liquidLimit, voidRatio, waterContent, selectedValue } = inputData;
    if (liquidLimit) {
        results.push(terzaghiandPeck1948(liquidLimit));
        results.push(skempton1944(liquidLimit));
        results.push(cozzolino1961(liquidLimit));
        results.push(cozzolino1961_2(liquidLimit));
        results.push(usace1990(liquidLimit));
        results.push(loandLovell1982(liquidLimit));
        results.push(balasubramaniamandBrenner1981(liquidLimit));
    }
    if (voidRatio) {
        results.push(azzouz1976(voidRatio));
        results.push(azzouz1976_2(voidRatio));
        results.push(azzouz1976_3(voidRatio));
        results.push(cozzolino1961_3(voidRatio));
        results.push(nishida1956(voidRatio));
        results.push(balasubramaniamandBrenner1981_2(voidRatio));
        results.push(balasubramaniamandBrenner1981_3(voidRatio));
        results.push(goldberg1979(voidRatio));
        results.push(loandLovell1982_2(voidRatio));
        results.push(azzouz1976_4(voidRatio));

        if (waterContent) {
            results.push(usace1990_3(voidRatio, waterContent));
        }
    }

    if (waterContent) {
        results.push(azzouz1976_5(waterContent));
        results.push(koppula1981(waterContent));
        results.push(usace1990andAzzouz1976(waterContent));
        results.push(usace1990_2(waterContent));
        results.push(azzouz1976_6(waterContent));
        results.push(loandLovell1982_3(waterContent));
        results.push(balasubramaniamandBrenner1981_4(waterContent));
        results.push(balasubramaniamandBrenner1981_5(waterContent));
    }

    return getResult(results, selectedValue);
}
