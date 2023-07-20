import { LoadingForm as LF } from 'forms/loading_form';
import { AnalysisOptions } from 'types/jet_grout/input_types';

export default class LoadingForm extends LF {
    constructor(analysisOptions: AnalysisOptions) {
        super();
        this.horizontalLoadX.required = analysisOptions.enhanceBearingCapacity;
        this.horizontalLoadY.required = analysisOptions.enhanceBearingCapacity;
        this.foundationPressure.required =
            analysisOptions.enhanceBearingCapacity ||
            analysisOptions.enhanceSettlement;
    }
}
