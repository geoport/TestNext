import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export default class ConstructionFieldForm extends BaseForm {
    city = new FormField({
        id: 'city',
        label: 'İl',
        type: 'text',
        required: true,
    });
    county = new FormField({
        id: 'county',
        label: 'İlçe',
        type: 'text',
        required: true,
    });
    neighbourhood = new FormField({
        id: 'neighbourhood',
        label: 'Mahalle',
        type: 'text',
        required: true,
    });
    pafta = new FormField({
        id: 'pafta',
        label: 'Pafta',
        type: 'text',
        required: true,
    });
    ada = new FormField({
        id: 'ada',
        label: 'Ada',
        type: 'text',
        required: true,
    });
    parsel = new FormField({
        id: 'parsel',
        label: 'Parsel',
        type: 'text',
        required: true,
    });
    boreholeDepth = new FormField({
        id: 'boreholeDepth',
        label: 'Toplam Sondaj Derinliği',
        unit: 'm',
        required: true,
    });
    boreholeNumber = new FormField({
        id: 'boreholeNumber',
        label: 'Toplam Sondaj Sayısı',
        required: true,
    });
    VS30 = new FormField({
        id: 'VS30',
        label: 'VS<sub>30</sub>',
        unit: 'm/s',
        required: true,
    });
}
