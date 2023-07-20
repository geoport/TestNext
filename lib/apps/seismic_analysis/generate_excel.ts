import { OutputData } from 'types/seismic_analysis/api_types';

export async function downloadTimeSeries(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `time_series.xlsx`;
    const timeHistory = outputData.timeHistory;

    const dfDict = {
        'Zaman(s)': timeHistory.times,
        'İvme(g)': timeHistory.accelerations,
        'Hız(cm/s)': timeHistory.velocities,
        'Deplasman(cm)': timeHistory.displacements,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadFourierSpectra(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `fourier_spectra.xlsx`;
    const fourierSpectra = outputData.fourierSpectra;

    const dfDict = {
        'Frekans(Hz)': fourierSpectra.frequencies,
        'Fourier Büyüklüğü': fourierSpectra.fourierAmplitudes,
        'Güç Yoğunluğu': fourierSpectra.powerAmplitudes,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadResponseSpectra(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `response_spectra.xlsx`;
    const responseSpectra = outputData.responseSpectra;

    const dfDict = {
        'Periyod(s)': responseSpectra.periods,
        'Spektral İvme(g)': responseSpectra.spectralAccelerations,
        'Spektral Hız(cm/s)': responseSpectra.spectralVelocities,
        'Spektral Yer Değiştirme(cm)': responseSpectra.spectralDisplacements,
        'Pseudo İvme(g)': responseSpectra.pseudoAccelerations,
        'Pseudo Hız(cm/s)': responseSpectra.pseudoVelocities,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function downloadGMP(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `gmp.xlsx`;
    const gmp = outputData.groundMotionParameters;

    const parameters = {
        pga: 'PGA(g)',
        pgaTime: "PGA'nin Gerçekleştiği Zaman(sn)",
        pgv: 'PGV(cm/s)',
        pgvTime: "PGV'nin Gerçekleştiği Zaman(sn)",
        pgd: 'PGD(cm)',
        pgdTime: "PGD'nin Gerçekleştiği Zaman(sn)",
        housnerIntensity: 'Housner Yoğunluğu(cm)',
        sustainedMaxAcceleration: 'Sürdürülebilir Maksimum İvme(g)',
        sustainedMaxVelocity: 'Sürdürülebilir Maksimum Hız(cm/s)',
        effectiveDesignAcceleration: 'Efektif Tasarım İvmesi(g)',
        accelerationSpectrumIntensity: 'İvme Spektrum Yoğunluğu(g*sn)',
        velocitySpectrumIntensity: 'Hız Spektrum Yoğunluğu(cm)',
        A95: 'A95(g)',
        predominantPeriod: 'Dominant Periyod(s)',
        meanPeriod: 'Ortalama Periyod(s)',
        uniformDuration: 'Uniform Süre(s)',
        bracketedDuration: 'Kapsamlı Süre(s)',
        significantDuration: 'Anlamlı Süre(s)',
        effectiveDuration: 'Etkili Süre(s)',
        ariasIntensity: 'Arias Yoğunluğu',
        RmsAcceleration: 'A_RMS(g)',
        RmsVelocity: 'V_RMS(cm/s)',
        RmsDisplacement: 'D_RMS(cm)',
        characteristicIntensity: 'Karakteristik Yoğunluk',
        specificEnergyDensity: 'Spesifik Enerji Yoğunluğu(cm2/sn)',
        cumulativeAbsoluteVelocity: 'Kümülatif Mutlak Hız(cm/sn)',
    };
    const values = [];
    for (const key of Object.keys(parameters)) {
        values.push(gmp[key as keyof typeof gmp]);
    }
    const dfDict = {
        Parametreler: Object.values(parameters),
        Değerler: values,
    };

    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}
