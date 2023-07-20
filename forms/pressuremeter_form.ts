import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export class PressuremeterForm extends BaseForm {
    depth = new FormField({
        id: 'depth',
        label: 'Derinlik',
        unit: 'm',
        minValue: 0,
    });
    limitPressure = new FormField({
        id: 'limitPressure',
        label: 'Limit Basınç',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    netLimitPressure = new FormField({
        id: 'netLimitPressure',
        label: 'Net Limit Basınç',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
}
