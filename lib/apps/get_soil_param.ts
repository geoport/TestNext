import soilParamLimits from 'data/soil_param_limits.json';
import soilParamDefinitions from 'data/soil_param_definitions.json';

export function getSoilParamLimits(
    soilClass: string,
    soilParam: string,
): number[] {
    let limits: number[] = [];
    const sc = soilClass as keyof typeof soilParamLimits;
    const param = soilParam as keyof typeof soilParamLimits.CH;
    if (soilParamLimits[sc]) {
        limits = soilParamLimits[sc][param];
    }
    return limits;
}

export function getSoilParamDefinition(soilParam: string): string {
    return soilParamDefinitions[soilParam as keyof typeof soilParamDefinitions];
}
