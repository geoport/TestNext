type FormFieldProps = {
    id: string;
    label?: string;
    type?: string;
    unit?: string;
    minValue?: number;
    maxValue?: number;
    required?: boolean;
    choices?: any[];
};

export class FormField {
    id: string;
    label?: string;
    type?: string = 'number';
    unit?: string;
    minValue?: number;
    maxValue?: number;
    required?: boolean;
    choices?: any[];
    constructor(props: FormFieldProps) {
        this.id = props.id;
        this.label = props.label;
        this.type = props.type;
        this.minValue = props.minValue;
        this.maxValue = props.maxValue;
        this.unit = props.unit;
        this.choices = props.choices;
        this.required = props.required;
    }
}
