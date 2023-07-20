import SoilProfileFormBase from '../soil_profile_form';
import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';

const localSoilClasses = createMapList(['ZA', 'ZB', 'ZC', 'ZD', 'ZE']);
const baseRockTypes = createMapList(['Rijit', 'Elastik']);

export default class SoilProfileForm extends SoilProfileFormBase {
    constructor(giveReport: boolean) {
        super();
        this.noBaseRock = new FormField({
            id: 'noBaseRock',
            label: 'Taban kayasına rastlanmamıştır',
        });
        this.rockLSC = new FormField({
            id: 'rockLSC',
            label: 'Taban Kayası Yerel Zemin Sınıfı',
            choices: localSoilClasses,
        });
        this.localSoilClass = new FormField({
            id: 'localSoilClass',
            label: 'Yerel Zemin Sınıfı',
            choices: localSoilClasses,
        });
        this.baseRockType = new FormField({
            id: 'baseRockType',
            label: 'Taban Kayası Tipi',
            choices: baseRockTypes,
        });
        this.baseRockDepth = new FormField({
            id: 'baseRockDepth',
            label: 'Taban Kayası Derinliği',
            unit: 'm',
            minValue: 0,
            required: giveReport,
        });
        this.thickness.required = true;
        this.unitWeight.required = true;
        this.shearWaveVelocity.required = true;
        this.plasticityIndex.required = true;
        this.dampingRatio.required = true;
        this.gwt.required = true;
    }
}
