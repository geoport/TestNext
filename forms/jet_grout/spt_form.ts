import { SptForm as SF } from 'forms/spt_form';

export default class SptForm extends SF {
    constructor() {
        super();
        this.depth.required = true;
        this.N.required = true;
        this.energyCorrectionFactor.required = true;
        this.diameterCorrectionFactor.required = true;
        this.samplerCorrectionFactor.required = true;
    }
}
