import { OutputData } from './types';

export async function generateSpectralAccelerations(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `spectra.xlsx`;
    const spectral_accelerations =
        outputData.spectral_accelerations as number[];
    const periods = outputData.periods as number[];
    const dfDict: { [key: string]: any } = {
        'Period(s)': periods,
        'Spektral İvme(g)': spectral_accelerations,
    };
    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}
