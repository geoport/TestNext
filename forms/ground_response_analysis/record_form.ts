import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const faultMap = createMapList([
    'Normal Eğim Atımlı',
    'Normal Oblik Atımlı',
    'Ters Eğim Atımlı',
    'Ters Oblik Atımlı',
    'Yanal Atımlı',
]);

const surfaceSpectraMethods = [
    { value: 'MSE', key: 'Minimum Karesel Hata' },
    {
        value: 'ASCE',
        key: 'ASCE',
    },
];

export default class RecordForm extends BaseForm {
    constructor(giveReport: boolean) {
        super();
        this.eventName = new FormField({
            label: 'Deprem Adı',
            id: 'eventName',
            type: 'text',
            required: giveReport,
        });
        this.stationName = new FormField({
            label: 'İstasyon Adı',
            id: 'stationName',
            type: 'text',
            required: giveReport,
        });
        this.year = new FormField({
            label: 'Deprem Yılı',
            id: 'year',
            minValue: 0,
            required: giveReport,
        });
        this.Mw = new FormField({
            label: 'Deprem Büyüklüğü',
            id: 'Mw',
            minValue: 0,
            required: giveReport,
        });
        this.pga = new FormField({
            label: 'PGA',
            unit: 'g',
            id: 'pga',
            minValue: 0,
            required: giveReport,
        });
        this.Rrup = new FormField({
            label: 'Fay Uzaklığı',
            unit: 'km',
            id: 'Rrup',
            minValue: 0,
            required: giveReport,
        });
        this.VS30 = new FormField({
            label: 'VS<sub>30</sub>',
            unit: 'm/s',
            id: 'VS30',
            minValue: 0,
            required: giveReport,
        });
        this.faultType = new FormField({
            id: 'faultType',
            label: 'Fay Tipleri',
            choices: faultMap,
        });
        this.surfaceSpectraMethod = new FormField({
            id: 'surfaceSpectraMethod',
            label: 'Yüzey Tasarım Spektrumu Oluşturma Yöntemi',
            choices: surfaceSpectraMethods,
        });
        this.autoSelect = new FormField({
            id: 'autoSelect',
            label: 'Deprem seçimini otomatik yap',
        });
    }
}
