import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export class ConstructionFieldForm extends BaseForm {
    pafta = new FormField({ id: 'pafta', label: 'Pafta', type: 'text' });
    ada = new FormField({ id: 'ada', label: 'Ada', type: 'text' });
    parsel = new FormField({ id: 'parsel', label: 'Parsel', type: 'text' });
    constructor(
        cities: string[],
        counties: string[],
        neighbourhoods: string[],
    ) {
        super();
        this.city = new FormField({
            id: 'city',
            label: 'İl',
            choices: createMapList(cities),
        });
        this.county = new FormField({
            id: 'county',
            label: 'İlçe',
            choices: createMapList(counties),
        });
        this.neighbourhood = new FormField({
            id: 'neighbourhood',
            label: 'Mahalle',
            choices: createMapList(neighbourhoods),
        });
    }
}
