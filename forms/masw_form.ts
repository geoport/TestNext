import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export class MaswForm extends BaseForm {
    thickness = new FormField({
        id: 'thickness',
        label: 'Kalınlık',
        unit: 'm',
        minValue: 0,
    });
    shearWaveVelocity = new FormField({
        id: 'shearWaveVelocity',
        label: 'Kayma Dalgası Hızı',
        unit: 'm/s',
        minValue: 0,
    });
    compressionalWaveVelocity = new FormField({
        id: 'compressionalWaveVelocity',
        label: 'P Dalgası Hızı',
        unit: 'm/s',
        minValue: 0,
    });
}
