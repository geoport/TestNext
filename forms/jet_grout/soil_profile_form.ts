import SoilProfileFormBase from '../soil_profile_form';
import { AnalysisOptions } from 'types/jet_grout/input_types';

export default class SoilProfileForm extends SoilProfileFormBase {
    constructor(analysisOptions: AnalysisOptions) {
        super();
        this.thickness.required = true;
        this.dryUnitWeight.required = true;
        this.saturatedUnitWeight.required = true;
        this.plasticityIndex.required = true;
        this.fineContent.required = true;
        if (analysisOptions.enhanceSettlement) {
            this.elasticModulus.required = true;
            this.poissonRatio.required = true;
        }
        if (analysisOptions.enhanceBearingCapacity) {
            this.cohesion.required = true;
            this.frictionAngle.required = true;
        }
    }
}
