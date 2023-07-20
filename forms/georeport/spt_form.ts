import { SptForm as SF } from 'forms/spt_form';

export default class SptForm extends SF {
    constructor(analysisOptions: Record<string, any>) {
        super();
        this.isRequired =
            (analysisOptions.liquefactionAnalysis &&
                analysisOptions.liquefactionByVS) ||
            (analysisOptions.localSoilClassAnalysis &&
                analysisOptions.localSoilClassBySPT);
        this.depth.required = this.isRequired;
        this.N.required = this.isRequired;
        this.energyCorrectionFactor.required = this.isRequired;
        this.diameterCorrectionFactor.required = this.isRequired;
        this.samplerCorrectionFactor.required = this.isRequired;
    }
}
