import { SeismicForm as SF } from 'forms/seismic_form';

export default class SeismicForm extends SF {
    constructor(requiredFields: Record<string, any>) {
        super();
        this.earthquakeMagnitude.required = requiredFields.earthquakeMagnitude;
        this.SS_DD1.required = requiredFields.SS;
        this.S1_DD1.required = requiredFields.S1;
        this.PGA_DD1.required = requiredFields.PGA;

        this.SS_DD2.required = requiredFields.SS;
        this.S1_DD2.required = requiredFields.S1;
        this.PGA_DD2.required = requiredFields.PGA;

        this.SS_DD3.required = requiredFields.SS;
        this.S1_DD3.required = requiredFields.S1;
        this.PGA_DD3.required = requiredFields.PGA;

        this.SS_DD4.required = requiredFields.SS;
        this.S1_DD4.required = requiredFields.S1;
        this.PGA_DD4.required = requiredFields.PGA;
    }
}
