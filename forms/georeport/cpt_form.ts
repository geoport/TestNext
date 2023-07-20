import { CptForm as CF } from 'forms/cpt_form';

export default class CptForm extends CF {
    constructor(analysisOptions: Record<string, any>) {
        super();
        this.isRequired =
            analysisOptions.liquefactionAnalysis &&
            analysisOptions.liquefactionByCPT;
        this.depth.required = this.isRequired;
        this.coneResistance.required = this.isRequired;
    }
}
