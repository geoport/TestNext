import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export class SptForm extends BaseForm {
    depth = new FormField({
        id: 'depth',
        label: 'Derinlik',
        unit: 'm',
        minValue: 0,
    });
    N = new FormField({
        id: 'N',
        minValue: 0,
        label: 'Vuruş Sayısı',
    });
    energyCorrectionFactor = new FormField({
        id: 'energyCorrectionFactor',
        label: 'Enerji Oranı Düzeltme Katsayısı (C<sub>E</sub>)',
        minValue: 0,
    });
    diameterCorrectionFactor = new FormField({
        id: 'diameterCorrectionFactor',
        label: 'Sondaj Delgi Çapı Düzeltme Katsayısı (C<sub>B</sub>)',
        minValue: 0,
    });
    samplerCorrectionFactor = new FormField({
        id: 'samplerCorrectionFactor',
        label: 'Numune Alıcı Tipi Düzeltme Katsayısı (C<sub>S</sub>)',
        minValue: 0,
    });
    makeCorrection = new FormField({
        id: 'makeCorrection',
        label: 'SPT düzeltmesi yap',
    });
}
