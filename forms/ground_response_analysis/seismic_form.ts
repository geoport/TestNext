import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export default class SeismicForm extends BaseForm {
    constructor(giveReport: boolean) {
        super();
        this.SS = new FormField({
            label: 'Kısa Periyot Harita Spektral İvme Katsayısı,S<sub>S</sub>',
            id: 'SS',
            minValue: 0.00000001,
            required: giveReport,
        });
        this.S1 = new FormField({
            label: '1 sn. Periyot İçin Harita Spektral İvme Katsayısı,S<sub>1</sub>',
            id: 'S1',
            minValue: 0.00000001,
            required: giveReport,
        });
        this.dyhd = new FormField({
            id: 'dyhd',
            label: 'Deprem Yer Hareketi Düzeyi',
            choices: createMapList(['DD-1', 'DD-2', 'DD-3', 'DD-4']),
        });
    }
}
