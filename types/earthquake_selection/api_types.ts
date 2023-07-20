export interface EqRecord {
    RSN: number;
    stationName: string;
    eventName: string;
    Mw: number;
    Rrup: number;
    VS30: number;
    year: number;
    faultType: string;
    timeStep: number;
    spectralAccelerations: number[];
    scaleFactor: number;
    fileName: string;
    fileNameEW: string;
    fileNameNS: string;
    accelerations: number[];
    accelerationsEW: number[];
    accelerationsNS: number[];
    pga: number;
    pgaEW: number;
    pgaNS: number;
    ai: number;
    aiEW: number;
    aiNS: number;
    pp: number;
    ppEW: number;
    ppNS: number;
}

export interface OutputData {
    gotEnoughRecords: boolean;
    targetSpectra: number[];
    targetSpectraPeriods: number[];
    selectedRecords: Record<string, EqRecord>;
}

export interface MetaData {
    RSN: number[];
    'Ölçeklendirme Katsayısı': number[];
    'Deprem Adı': string[];
    'İstasyon Adı': string[];
    'Deprem Yılı': number[];
    'Deprem Büyüklüğü': number[];
    'VS30(m/s)': number[];
    'Fay Tipi': string[];
    'Fay Uzaklığı(km)': number[];
    'Kayıt Aralığı(s)': number[];
}
