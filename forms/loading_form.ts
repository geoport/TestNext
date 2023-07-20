import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export class LoadingForm extends BaseForm {
    horizontalLoadX = new FormField({
        id: 'horizontalLoadX',
        label: 'Kısa Kenar Yönündeki Yatay Yük',
        unit: 't',
        minValue: 0,
    });
    horizontalLoadY = new FormField({
        id: 'horizontalLoadY',
        label: 'Uzun Kenar Yönündeki Yatay Yük',
        unit: 't',
        minValue: 0,
    });
    foundationPressure = new FormField({
        id: 'foundationPressure',
        label: 'Temel Taban Basıncı',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    loadingCase1Min = new FormField({
        id: 'loadingCase1Min',
    });
    loadingCase2Min = new FormField({
        id: 'loadingCase2Min',
    });
    loadingCase3Min = new FormField({
        id: 'loadingCase3Min',
    });
    loadingCase1Avg = new FormField({
        id: 'loadingCase1Avg',
    });
    loadingCase2Avg = new FormField({
        id: 'loadingCase2Avg',
    });
    loadingCase3Avg = new FormField({
        id: 'loadingCase3Avg',
    });
    loadingCase1Max = new FormField({
        id: 'loadingCase1Max',
    });
    loadingCase2Max = new FormField({
        id: 'loadingCase2Max',
    });
    loadingCase3Max = new FormField({
        id: 'loadingCase3Max',
    });
}
