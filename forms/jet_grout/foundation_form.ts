import { FoundationForm as FF } from 'forms/foundation_form';
import { AnalysisOptions } from 'types/jet_grout/input_types';

export default class FoundationForm extends FF {
    constructor(analysisOptions: AnalysisOptions) {
        super();
        this.foundationDepth.required =
            analysisOptions.enhanceBearingCapacity ||
            analysisOptions.enhanceSettlement;
        this.foundationLength.required =
            analysisOptions.enhanceBearingCapacity ||
            analysisOptions.enhanceSettlement;
        this.foundationWidth.required =
            analysisOptions.enhanceBearingCapacity ||
            analysisOptions.enhanceSettlement;
        this.foundationBaseAngle.required =
            analysisOptions.enhanceBearingCapacity;
        this.slopeAngle.required = analysisOptions.enhanceBearingCapacity;
    }
}
