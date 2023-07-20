import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export class FoundationForm extends BaseForm {
    foundationWidth = new FormField({
        id: 'foundationWidth',
        label: 'Temel Genişliği',
        unit: 'm',
        minValue: 0.001,
    });
    foundationLength = new FormField({
        id: 'foundationLength',
        label: 'Temel Uzunluğu',
        unit: 'm',
        minValue: 0.001,
    });
    foundationDepth = new FormField({
        id: 'foundationDepth',
        label: 'Temel Alt Kotu',
        unit: 'm',
        minValue: 0,
    });
    foundationBaseAngle = new FormField({
        id: 'foundationBaseAngle',
        label: 'Temel Taban Açısı(θ)',
        minValue: 0,
    });
    slopeAngle = new FormField({
        id: 'slopeAngle',
        label: 'Şev Açısı(β)',
        minValue: 0,
    });
    foundationArea = new FormField({
        id: 'foundationArea',
        label: 'Oturma Alanı',
        minValue: 0.0001,
        unit: 'm²',
    });
    foundationType = new FormField({
        id: 'foundationType',
        label: 'Temel Tipi',
        type: 'text',
    });
    foundationSurfaceType = new FormField({
        id: 'foundationSurfaceType',
        label: 'Sürtünme Ara Yüzeyi',
        choices: createMapList([
            'Yerinde Dökme Beton - Sıkıştırılmış Temel Taban Zemini',
            'Önüretimli Beton - Sıkıştırılmış Temel Taban Zemini',
            'Yerinde Dökme Beton - Beton',
            'Beton - Taban Kayası',
        ]),
    });
}
