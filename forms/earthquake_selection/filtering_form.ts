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

export default class FilteringForm extends BaseForm {
    minMw = new FormField({
        id: 'minMw',
        label: 'Minimum Deprem Büyüklüğü',
        required: true,
    });
    maxMw = new FormField({
        id: 'maxMw',
        label: 'Maksimum Deprem Büyüklüğü',
        required: true,
    });
    minPga = new FormField({
        id: 'minPga',
        label: 'Minimum PGA',
        unit: 'g',
        required: true,
    });
    maxPga = new FormField({
        id: 'maxPga',
        label: 'Maksimum PGA',
        unit: 'g',
        required: true,
    });
    minAI = new FormField({
        id: 'minAI',
        label: 'Minimum Arias Yoğunluğu',
        required: true,
        unit: 'm/s',
    });
    maxAI = new FormField({
        id: 'maxAI',
        label: 'Maksimum Arias Yoğunluğu',
        required: true,
        unit: 'm/s',
    });
    minRrup = new FormField({
        id: 'minRrup',
        label: 'Minimum Fay Uzaklığı',
        required: true,
        unit: 'km',
    });
    maxRrup = new FormField({
        id: 'maxRrup',
        label: 'Maksimum Fay Uzaklığı',
        required: true,
        unit: 'km',
    });
    minVS30 = new FormField({
        id: 'minVS30',
        label: 'Minimum VS<sub>30</sub>',
        required: true,
        unit: 'm/s',
    });
    maxVS30 = new FormField({
        id: 'maxVS30',
        label: 'Maksimum VS<sub>30</sub>',
        required: true,
        unit: 'm/s',
    });
    minYear = new FormField({
        id: 'minYear',
        label: 'Minimum Deprem Yılı',
        required: true,
    });
    maxYear = new FormField({
        id: 'maxYear',
        label: 'Maksimum Deprem Yılı',
        required: true,
    });
    faultTypes = new FormField({
        id: 'faultTypes',
        label: 'Fay Tipleri',
        choices: faultMap,
    });
}
