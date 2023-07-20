import { MaswForm as MF } from 'forms/masw_form';

export default class MaswForm extends MF {
    constructor(analysisOptions: Record<string, any>) {
        super();
        this.isRequired =
            (analysisOptions.liquefactionAnalysis &&
                analysisOptions.liquefactionByVS) ||
            (analysisOptions.localSoilClassAnalysis &&
                analysisOptions.localSoilClassByVS) ||
            (analysisOptions.bearingCapacityAnalysis &&
                analysisOptions.bearingCapacityByVS);
        this.thickness.required = this.isRequired;
        this.shearWaveVelocity.required = this.isRequired;
        this.compressionalWaveVelocity.required = this.isRequired;
    }
}
