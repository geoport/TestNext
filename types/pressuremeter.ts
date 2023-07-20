export interface PressuremeterData {
    depth?: number | string;
    limitPressure?: number | string;
    netLimitPressure?: number | string;
}

export interface Pressuremeter {
    depth?: number[];
    limitPressure?: number[];
    netLimitPressure?: number[];
}
