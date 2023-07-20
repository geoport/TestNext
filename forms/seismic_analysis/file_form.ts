import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const accUnits = createMapList([
    'g',
    'm/sn2',
    'cm/sn2',
    'mm/sn2',
    'inc/sn2',
    'ft/sn2',
]);

const velUnits = createMapList(['m/sn', 'cm/sn', 'mm/sn', 'inc/sn', 'ft/sn']);

const dispUnits = createMapList(['m', 'cm', 'mm', 'inc', 'ft']);

const dataTypes = [
    { value: 'acc', key: 'İvme' },
    { value: 'vel', key: 'Hız' },
    { value: 'disp', key: 'Deplasman' },
];

export default class FileForm extends BaseForm {
    file = new FormField({
        id: 'file',
        label: 'Veri Dosyası',
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
    accUnit = new FormField({
        label: 'İvme Birimi',
        id: 'accUnit',
        choices: accUnits,
    });
    velUnit = new FormField({
        label: 'Hız Birimi',
        id: 'velUnit',
        choices: velUnits,
    });
    dispUnit = new FormField({
        label: 'Yer Değiştirme Birimi',
        id: 'dispUnit',
        choices: dispUnits,
    });
    dataType = new FormField({
        label: 'Veri Türü',
        id: 'dataType',
        choices: dataTypes,
    });
}
