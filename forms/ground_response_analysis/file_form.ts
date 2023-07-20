import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const units = createMapList([
    'g',
    'm/sn2',
    'cm/sn2',
    'mm/sn2',
    'inc/sn2',
    'ft/sn2',
]);

export default class FileForm extends BaseForm {
    file = new FormField({
        label: 'Deprem Kayıt Dosyası',
        id: 'file',
    });
    unit = new FormField({
        label: 'İvme Birim,',
        id: 'unit',
        choices: units,
    });
    firstRowNo = new FormField({
        label: 'İlk Satır Numarası',
        id: 'firstRowNo',
        minValue: 1,
        required: true,
    });
    lastRowNo = new FormField({
        label: 'Son Satır Numarası',
        id: 'lastRowNo',
        minValue: 1,
        required: true,
    });
    timeStep = new FormField({
        label: 'Örnekleme Aralığı',
        unit: 's',
        id: 'timeStep',
        minValue: 0.00000001,
        required: true,
    });
    scaleFactor = new FormField({
        label: 'Ölçekleme Katsayısı',
        id: 'scaleFactor',
        minValue: 0.00000001,
        required: true,
    });
}
