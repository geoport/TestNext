import { BuildingForm as BF } from 'forms/building_form';

export default class BuildingForm extends BF {
    constructor(giveReport: boolean) {
        super();
        this.structuralSystem.required = giveReport;
        this.buildingType.required = giveReport;
    }
}
