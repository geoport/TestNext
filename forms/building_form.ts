import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const buildingUsageClasses = createMapList(['1', '2', '3']);
const buildingImportanceFactors = createMapList(['1.0', '1.2', '1.5']);
const buildingHeightClasses = createMapList([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
]);

export class BuildingForm extends BaseForm {
    structuralSystem = new FormField({
        id: 'structuralSystem',
        label: 'Taşıyıcı Sistem',
        type: 'text',
    });
    buildingType = new FormField({
        id: 'buildingType',
        label: 'Yapı Kullanım Amacı',
        type: 'text',
    });
    constructionArea = new FormField({
        id: 'constructionArea',
        label: 'Toplam İnşaat Alanı',
        unit: 'm²',
    });
    foundationArea = new FormField({
        id: 'foundationArea',
        label: 'Yapı Oturma Alanı',
        unit: 'm²',
    });
    basementFloorNumber = new FormField({
        id: 'basementFloorNumber',
        label: 'Bodrum Kat Adedi',
    });
    totalFloorNumber = new FormField({
        id: 'totalFloorNumber',
        label: 'Toplam Kat Adedi',
    });
    buildingHeight = new FormField({
        id: 'buildingHeight',
        label: 'Bina Yüksekliği',
        unit: 'm',
    });
    buildingUsageClass = new FormField({
        id: 'buildingUsageClass',
        label: 'Bina Kullanım Sınıfı',
        choices: buildingUsageClasses,
    });
    buildingHeightClass = new FormField({
        id: 'buildingHeightClass',
        label: 'Bina Yükseklik Sınıfı',
        choices: buildingHeightClasses,
    });
    buildingImportanceFactor = new FormField({
        id: 'buildingImportanceFactor',
        label: 'Bina Önem Katsayısı',
        choices: buildingImportanceFactors,
    });
}
