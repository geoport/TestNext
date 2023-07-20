import { PressuremeterForm as PF } from 'forms/pressuremeter_form';

export default class PressuremeterForm extends PF {
    constructor(analysisOptions: Record<string, any>) {
        super();
        this.isRequired =
            analysisOptions.bearingCapacityAnalysis &&
            analysisOptions.bearingCapacityByPressuremeter;
        this.depth.required = this.isRequired;
        this.limitPressure.required = this.isRequired;
        this.netLimitPressure.required = this.isRequired;
    }
}
