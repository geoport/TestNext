import SoilProfileFormBase from '../soil_profile_form';
import { FormField } from 'models/FormField';

export default class SoilProfileForm extends SoilProfileFormBase {
    checkThickClayLayer = new FormField({
        id: 'checkThickClayLayer',
        label: "Zemin profili toplamda 3 m'den kalın turba ve/veya organik içeriği yüksek kil içeriyor.",
    });
    checkHighPlasticityClayContent = new FormField({
        id: 'checkHighPlasticityClayContent',
        label: "Zemin profili toplamda 8 m'den kalın yüksek plastisiteli kil (PI>50) içeriyor.",
    });
    checkSoftClayContent = new FormField({
        id: 'checkSoftClayContent',
        label: 'Zemin profili çok Kalın (>35 m) yumuşak veya orta katı kil içeriyor içeriyor.',
    });
    checkSensitiveClayContent = new FormField({
        id: 'checkSensitiveClayContent',
        label: 'Zemin profili yüksek derecede hassas kil içeriyor.',
    });

    constructor(requiredFields: Record<string, any>) {
        super();
        for (const field of Object.keys(requiredFields)) {
            this[field].required = requiredFields[field];
        }
    }
}
