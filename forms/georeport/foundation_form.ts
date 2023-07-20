import { FoundationForm as FF } from 'forms/foundation_form';

export default class FoundationForm extends FF {
    constructor(requirements: { [key: string]: boolean }) {
        super();
        if (requirements) {
            for (const field of Object.keys(requirements)) {
                this[field].required = requirements[field];
            }
        }
    }
}
