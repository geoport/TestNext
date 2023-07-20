import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export class CptForm extends BaseForm {
    depth = new FormField({
        id: 'depth',
        label: 'Derinlik',
        unit: 'm',
        minValue: 0,
    });
    coneResistance = new FormField({
        id: 'coneResistance',
        label: 'Koni Uc Direnci',
        unit: 'MPa',
        minValue: 0,
    });
}
