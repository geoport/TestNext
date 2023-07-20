import { FormField } from 'models/FormField';
import SoilClassMap from 'data/soil_classes.json';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export default class LabExperimentsForm extends BaseForm {
    boreholeNo = new FormField({
        id: 'boreholeNo',
        label: 'Kuyu No',
        type: 'text',
    });
    depth = new FormField({ id: 'depth', label: 'Derinlik', unit: 'm' });
    naturalUnitWeight = new FormField({
        id: 'naturalUnitWeight',
        label: 'Doğal Birim Hacim Ağırlığı',
        unit: 't/m<sup>3</sup>',
    });
    cohesion = new FormField({
        id: 'cohesion',
        label: 'Kohezyon',
        unit: 't/m<sup>2</sup>',
    });
    frictionAngle = new FormField({
        id: 'frictionAngle',
        label: 'İçsel Sürtünme Açısı',
    });
    fineContent = new FormField({
        id: 'fineContent',
        label: 'İnce Dane Oranı',
        unit: '%',
    });
    waterContent = new FormField({
        id: 'waterContent',
        label: 'Su Muhtevası',
        unit: '%',
    });
    liquidLimit = new FormField({ id: 'liquidLimit', label: 'Likit Limit' });
    plasticLimit = new FormField({
        id: 'plasticLimit',
        label: 'Plastik Limit',
    });
    plasticityIndex = new FormField({
        id: 'plasticityIndex',
        label: 'Plastisite İndeksi',
    });
    soilClass = new FormField({
        id: 'soilClass',
        label: 'Zemin Sınıfı',
        type: "text",
    });
}
