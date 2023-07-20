import { SeismicForm as SF } from 'forms/seismic_form';

export default class SeismicForm extends SF {
    constructor() {
        super();
        this.earthquakeMagnitude.required = true;
        this.SS.required = true;
        this.S1.required = true;
    }
}
