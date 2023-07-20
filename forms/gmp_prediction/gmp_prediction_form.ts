import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const faultMap = createMapList(['Normal', 'Ters', 'Yanal']);
const outputMap = [
    { value: 'PGA', key: 'PGA' },
    { value: 'PGV', key: 'PGV' },
    { value: 'PGD', key: 'PGD' },
    { value: 'SA', key: 'Spektral İvme' },
    { value: 'RS', key: 'Tepki Spektrumu' },
];

export default class GmpPredictionForm extends BaseForm {
    Mw = new FormField({
        id: 'Mw',
        label: 'Deprem Büyüklüğü',
        required: true,
    });

    Rrup = new FormField({
        id: 'Rrup',
        label: 'Fay Uzaklığı,R<sub>rup</sub>',
        unit: 'km',
        required: true,
    });

    VS30 = new FormField({
        id: 'VS30',
        label: 'VS<sub>30</sub>',
        unit: 'm/s',
        required: true,
    });

    faultType = new FormField({
        id: 'faultType',
        label: 'Fay Mekanizması',
        choices: faultMap,
    });

    period = new FormField({
        id: 'period',
        label: 'Periyot',
        unit: 's',
    });

    outputType = new FormField({
        id: 'outputType',
        label: 'Yer Hareketi Parametresi',
        choices: outputMap,
    });
}
