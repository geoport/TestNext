import { getResult } from './helper';

/**
 * Shear Modulus correlations with N1_60 input. The output unit is "t/m2".
 *
 * @param N1_60 - N1.60 corresponds to 60% of the theoretical free-falling
 * ram energy and the effective overlay load is the corrected impact count
 * by taking the pressure 100 kPa. in SPT. Shown as "sptN1_60" in correlations.
 *
 * @returns calcShearModulus
 */

// data gathered from Bangalore
function anbazgahanandSitraham2007(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = (13860 * sptN1_60 ** 0.68) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// data gathered from India
function anbazgahanSitrahamandDiryac2007(N1_60: string): string {
    const sptN1_60 = parseFloat(N1_60);
    let result = (11800 * sptN1_60 ** 0.68) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

/**
 * Shear Modulus correlations with N60 input. The output unit is "t/m2".
 *
 * @param N60 - N60 accounts to the number of blows corrected
 * for 60% of the theoretical free fall ram energy in SPT. Shown
 * as "sptN60" in correlations.
 *
 * @returns calcShearModulus
 */

// For all soils
function imaiandTonouchi1982(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (14120 * sptN60 ** 0.68) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For alluvial clays
function imaiandTonouchi1982_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (17260 * sptN60 ** 0.607) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For dillivual clays
function imaiandTonouchi1982_3(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (24610 * sptN60 ** 0.555) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For mixed soil type
function imaiandYoshimura1982(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (9810 * sptN60 ** 0.78) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For alluvial sand and clay
function ohbaandTourimi1970(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (11960 * sptN60 ** 0.62) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function ohsakiandIwasaki1973(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (11940 * sptN60 ** 0.78) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For all soils
function ohsakiandIwasaki1973_2(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (11770 * sptN60 ** 0.8) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For cohesive soils
function ohsakiandIwasaki1973_3(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (13730 * sptN60 ** 0.71) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// For intermediate soils
function ohsakiandIwasaki1973_4(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (11590 * sptN60 ** 0.76) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// Conservative results (for horizontally)
function randolph1981(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (1000 * sptN60) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

// based on Ohsaki and Iwasaki ,1973
function wroth1979(N60: string): string {
    const sptN60 = parseFloat(N60);
    let result = (100 * 120 * sptN60 ** 0.8) / 10;
    if (result < 0) {
        result = 0;
    }
    return `${result.toFixed(2)}`;
}

export default function calcShearModulus(
    inputData: any,
    soilClass: string,
): string {
    const { N60, N1_60, selectedValue } = inputData;
    const results = [];
    if (N60) {
        results.push(imaiandTonouchi1982(N60));
        results.push(imaiandTonouchi1982(N60));
        results.push(imaiandTonouchi1982_2(N60));
        results.push(imaiandTonouchi1982_3(N60));
        results.push(imaiandYoshimura1982(N60));
        results.push(ohbaandTourimi1970(N60));
        results.push(ohsakiandIwasaki1973(N60));
        results.push(ohsakiandIwasaki1973_2(N60));
        results.push(ohsakiandIwasaki1973_3(N60));
        results.push(ohsakiandIwasaki1973_4(N60));
        results.push(randolph1981(N60));
        results.push(wroth1979(N60));
    }
    if (N1_60) {
        results.push(anbazgahanandSitraham2007(N1_60));
        results.push(anbazgahanSitrahamandDiryac2007(N1_60));
    }

    return getResult(results, selectedValue);
}
