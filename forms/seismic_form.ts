import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export class SeismicForm extends BaseForm {
    dyhd = new FormField({
        id: 'dyhd',
        label: 'Deprem Yer Hareketi Düzeyi',
        choices: createMapList(['DD-1', 'DD-2', 'DD-3', 'DD-4']),
    });
    localSoilClass = new FormField({
        id: 'localSoilClass',
        label: 'Yerel Zemin Sınıfı',
        choices: createMapList(['ZA', 'ZB', 'ZC', 'ZD', 'ZE']),
    });
    earthquakeMagnitude = new FormField({
        id: 'earthquakeMagnitude',
        label: 'Deprem Büyüklüğü',
        minValue: 0,
    });
    SS = new FormField({
        id: 'SS',
        minValue: 0,
        label: 'S<sub>S</sub>',
    });
    S1 = new FormField({
        id: 'S1',
        minValue: 0,
        label: 'S<sub>1</sub>',
    });
    PGA = new FormField({
        id: 'PGA',
        minValue: 0,
        label: 'PGA',
        unit: 'g',
    });
    SS_DD1 = new FormField({
        id: 'SS_DD1',
        minValue: 0,
    });
    S1_DD1 = new FormField({
        id: 'S1_DD1',
        minValue: 0,
    });
    PGA_DD1 = new FormField({
        id: 'PGA_DD1',
        minValue: 0,
    });
    SS_DD2 = new FormField({
        id: 'SS_DD2',
        minValue: 0,
    });
    S1_DD2 = new FormField({
        id: 'S1_DD2',
        minValue: 0,
    });
    PGA_DD2 = new FormField({
        id: 'PGA_DD2',
        minValue: 0,
    });
    SS_DD3 = new FormField({
        id: 'SS_DD3',
        minValue: 0,
    });
    S1_DD3 = new FormField({
        id: 'S1_DD3',
        minValue: 0,
    });
    PGA_DD3 = new FormField({
        id: 'PGA_DD3',
        minValue: 0,
    });
    SS_DD4 = new FormField({
        id: 'SS_DD4',
        minValue: 0,
    });
    S1_DD4 = new FormField({
        id: 'S1_DD4',
        minValue: 0,
    });
    PGA_DD4 = new FormField({
        id: 'PGA_DD4',
        minValue: 0,
    });
}
