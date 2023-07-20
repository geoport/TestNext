import { FoundationForm as FF } from 'forms/foundation_form';

export default class FoundationForm extends FF {
    constructor(giveReport: boolean) {
        super();
        this.foundationArea.required = giveReport;
        this.foundationWidth.required = giveReport;
        this.foundationLength.required = giveReport;
        this.foundationDepth.required = giveReport;
    }
}
