import { zeros, array } from 'numjs';
import * as apiTypes from 'types/ground_response_analysis/api_types';

export async function downloadTimeSeries(
    inputMotion: apiTypes.TimeHistory,
    outputMotion: apiTypes.TimeHistory,
    index: number,
) {
    const { DataFrame, toExcel } = await import('danfojs');

    const fileName = `time_series_${index + 1}.xlsx`;

    const dfDict = {
        'Zaman(s)': inputMotion.times,
        'Girdi İvme(g)': inputMotion.accelerations,
        'Girdi Hız(cm/s)': inputMotion.velocities,
        'Girdi Deplasman(cm)': inputMotion.displacements,
        'Yüzey İvme(g)': outputMotion.accelerations,
        'Yüzey Hız(cm/s)': outputMotion.velocities,
        'Yüzey Deplasman(cm)': outputMotion.displacements,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadSingleResponseSpectra(
    inputSA: number[],
    outputSA: number[],
    periods: number[],
    index: number,
) {
    const { DataFrame, toExcel } = await import('danfojs');

    const fileName = `response_spectra_${index + 1}.xlsx`;
    const dfDict = {
        'Periyod(s)': periods,
        'Girdi Spektral İvme(g)': inputSA,
        'Yüzey Spektral İvme(g)': outputSA,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadAverageResponseSpectra(
    outputMotions: apiTypes.OutputMotion,
) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `response_spectra_average.xlsx`;

    const periods = outputMotions['Record1'].periods;
    let total = zeros(periods.length);
    const numOfRecords = Object.keys(outputMotions).length;

    const dfDict: Record<string, number[]> = {
        'Periyod(s)': periods,
    };

    for (let i = 0; i < numOfRecords; i++) {
        const record = outputMotions[`Record${i + 1}`];
        const sa = array(record.spectralAccelerations);
        total = total.add(sa);
        dfDict[`#${i + 1}`] = sa.tolist();
    }

    const average = total.divide(numOfRecords).tolist();
    dfDict['Ortalama'] = average;

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadProfileData(
    index: number,
    depth: number[],
    pga: number[],
    pgv: number[],
    pgd: number[],
    maxStrains: number[],
    maxStresses: number[],
) {
    const { DataFrame, toExcel } = await import('danfojs');
    maxStrains.push(maxStrains[maxStrains.length - 1]);
    maxStresses.push(maxStresses[maxStresses.length - 1]);

    const fileName = `profile_${index + 1}.xlsx`;
    const dfDict = {
        'Derinlik(m)': depth,
        'PGA(g)': pga,
        'PGV(cm/s)': pgv,
        'PGD(cm)': pgd,
        'Max Strain(%)': maxStrains,
        'Max Stres(kPa)': maxStresses,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}
