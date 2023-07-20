import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';
import createMapList from 'lib/create_map';

export default class FieldExperimentsForm extends BaseForm {
    boreHoleNumber = new FormField({ id: 'boreHoleNumber', type: 'text' });
    boreHoleDepth = new FormField({ id: 'boreHoleDepth', minValue: 0 });
    pitNumber = new FormField({
        id: 'pitNumber',
        label: 'Açılan Araştırma Çukur Sayısı',
        minValue: 0,
    });
    totalPitDepth = new FormField({
        id: 'totalPitDepth',
        label: 'Toplam Araştırma Çukur Derinliği',
        minValue: 0,
        unit: 'm',
    });
    investigationDateStart = new FormField({
        id: 'investigationDateStart',
        label: 'Sondaj Başlangıç Tarihi',
    });
    investigationDateFinish = new FormField({
        id: 'investigationDateFinish',
        label: 'Sondaj Bitiş Tarihi',
    });
    investigationCategory = new FormField({
        id: 'investigationCategory',
        label: 'Zemin Etüt Kategorisi',
        choices: createMapList(['Kategori 1', 'Kategori 2', 'Kategori 3']),
    });
}
