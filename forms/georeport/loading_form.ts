import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';
import { LoadingForm as LF } from 'forms/loading_form';

export default class LoadingForm extends LF {
    constructor(requiredFields: Record<string, any>) {
        super();
        this.horizontalLoadX.required = requiredFields.horizontalLoadX;
        this.horizontalLoadY.required = requiredFields.horizontalLoadY;
        this.loadingCase1Min.required = requiredFields.loadingCase1Min;
        this.loadingCase2Min.required = requiredFields.loadingCase2Min;
        this.loadingCase3Min.required = requiredFields.loadingCase3Min;
        this.loadingCase1Avg.required = requiredFields.loadingCase1Avg;
        this.loadingCase2Avg.required = requiredFields.loadingCase2Avg;
        this.loadingCase3Avg.required = requiredFields.loadingCase3Avg;
        this.loadingCase1Max.required = requiredFields.loadingCase1Max;
        this.loadingCase2Max.required = requiredFields.loadingCase2Max;
        this.loadingCase3Max.required = requiredFields.loadingCase3Max;
    }
}
