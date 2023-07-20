import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export default class AnalysisOptionsForm extends BaseForm {
    enhanceBearingCapacity = new FormField({
        id: 'enhanceBearingCapacity',
        label: 'Taşıma Kapasitesini İyileştir',
    });
    enhanceSoilParams = new FormField({
        id: 'enhanceSoilParams',
        label: 'Zemin Parametrelerini İyileştir',
    });
    enhanceSettlement = new FormField({
        id: 'enhanceSettlement',
        label: 'Oturmayı İyileştir',
    });
}
