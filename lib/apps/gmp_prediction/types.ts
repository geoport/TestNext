export interface InputData {
    Mw: number | string;
    faultType: string;
    VS30: number | string;
    period: number | string;
    Rrup: number | string;
    outputType: string;
}

export interface OutputData {
    PGA?: number;
    PGV?: number;
    PGD?: number;
    SA?: number;
    periods?: number[];
    spectral_accelerations?: number[];
    outputType: 'PGA' | 'PGV' | 'PGD' | 'SA';
}
export const initialState: InputData = {
    Mw: '',
    faultType: 'Normal',
    VS30: '',
    period: '',
    Rrup: '',
    outputType: 'PGA',
};
