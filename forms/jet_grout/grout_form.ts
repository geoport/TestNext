import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export default class GroutForm extends BaseForm {
    diameter = new FormField({
        id: 'diameter',
        label: 'Kolon Çapı,r',
        unit: 'm',
        minValue: 0.001,
        required: true,
    });
    horizontalSpacing = new FormField({
        id: 'horizontalSpacing',
        label: 'Eksenler Arası Yatay Mesafe,S<sub>x</sub>',
        unit: 'm',
        minValue: 0.0001,
        required: true,
    });
    verticalSpacing = new FormField({
        id: 'verticalSpacing',
        label: 'Eksenler Arası Düşey Mesafe,S<sub>y</sub>',
        unit: 'm',
        minValue: 0.0001,
        required: true,
    });
    elasticModulus = new FormField({
        id: 'elasticModulus',
        label: 'Elastisite Modülü',
        unit: 't/m<sup>2</sup>',
        minValue: 0.0001,
        required: true,
    });
    poissonsRatio = new FormField({
        id: 'poissonsRatio',
        label: 'Poisson Oranı',
        minValue: 0.0001,
        required: true,
    });
    unconfinedCompressiveStrength = new FormField({
        id: 'unconfinedCompressiveStrength',
        label: 'Tek Eksenli Basınç Dayanımı',
        unit: 't/m<sup>2</sup>',
        minValue: 0.0001,
        required: true,
    });
    shearModulus = new FormField({
        id: 'shearModulus',
        label: 'Kayma Modülü',
        unit: 't/m<sup>2</sup>',
        minValue: 0.0001,
        required: true,
    });
}
