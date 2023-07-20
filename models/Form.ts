import { FormField } from './FormField';

interface Form {
    [key: string]: any;
    anyOfFields: {
        fields: FormField[];
        errorMessage: string;
    };
}

abstract class BaseForm implements Form {
    [key: string]: any;
    anyOfFields: {
        fields: FormField[];
        errorMessage: string;
    } = { fields: [], errorMessage: '' };
}

export default BaseForm;
