import { FormField } from 'models/FormField';
import { ConstructionFieldForm as CF } from 'forms/construction_field_form';

export default class ConstructionFieldForm extends CF {
    parcelArea = new FormField({
        id: 'parcelArea',
        label: 'Arazi Alanı',
        unit: 'm²',
    });
    landSlope = new FormField({
        id: 'landSlope',
        label: 'Oturma Alanındaki Topografik Eğim',
        unit: '%',
    });
    northParcelInfo = new FormField({ id: 'northParcelInfo', type: 'text' });
    southParcelInfo = new FormField({ id: 'southParcelInfo', type: 'text' });
    eastParcelInfo = new FormField({ id: 'eastParcelInfo', type: 'text' });
    westParcelInfo = new FormField({ id: 'westParcelInfo', type: 'text' });
    northStructuralInfo = new FormField({
        id: 'northStructuralInfo',
        type: 'text',
    });
    southStructuralInfo = new FormField({
        id: 'southStructuralInfo',
        type: 'text',
    });
    eastStructuralInfo = new FormField({
        id: 'eastStructuralInfo',
        type: 'text',
    });
    westStructuralInfo = new FormField({
        id: 'westStructuralInfo',
        type: 'text',
    });
    latitude = new FormField({ id: 'latitude' });
    longitude = new FormField({ id: 'longitude' });
}
