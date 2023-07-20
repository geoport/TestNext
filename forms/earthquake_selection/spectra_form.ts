import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

const scalingMethods = [
    { value: 'MSE', key: 'Minimum Karesel Hata' },
    {
        value: 'Over',
        key: 'Belirli Periyot Aralığında Hedef Spektrumun Üzerine Çıkart',
    },
];

const spectraTypes = [
    { value: 'SRSS', key: 'SRSS' },
    { value: 'GeoMean', key: 'Geometrik Ortalama' },
    {
        value: 'H',
        key: 'Yatay Bileşen',
    },
    {
        value: 'V',
        key: 'Dikey Bileşen',
    },
];

export default class SpectraForm extends BaseForm {
    optimizeAverage = new FormField({
        id: 'optimizeAverage',
        label: 'Ortalama tepki spectrumunu optimize et',
    });
    allowScaling = new FormField({
        id: 'allowScaling',
        label: 'Seçilen kayıtları ölçeklendir',
    });
    SDS = new FormField({
        id: 'SDS',
        label: 'S<sub>DS</sub>',
        minValue: 0.0001,
        required: true,
    });
    SD1 = new FormField({
        id: 'SD1',
        label: 'S<sub>D1</sub>',
        minValue: 0.0001,
        required: true,
    });
    requiredRecordNumber = new FormField({
        id: 'requiredRecordNumber',
        label: 'Seçilecek Kayıt Sayısı',
        minValue: 1,
        maxValue: 50,
        required: true,
    });
    maxAllowedStation = new FormField({
        id: 'maxAllowedStation',
        label: 'Bir Depremde Kullanılabilecek İstasyon Sayısı',
        minValue: 1,
        required: true,
    });
    minSelectionPeriod = new FormField({
        id: 'minSelectionPeriod',
        label: 'Başlangıç Periyodu',
        unit: 's',
        minValue: 0,
        required: true,
    });
    maxSelectionPeriod = new FormField({
        id: 'maxSelectionPeriod',
        label: 'Bitiş Periyodu',
        unit: 's',
        minValue: 0.1,
        required: true,
    });
    minScalingPeriod = new FormField({
        id: 'minScalingPeriod',
        label: 'Başlangıç Ölçeklendirme Periyodu',
        unit: 's',
        minValue: 0,
    });
    maxScalingPeriod = new FormField({
        id: 'maxScalingPeriod',
        label: 'Bitiş Ölçeklendirme Periyodu',
        unit: 's',
        minValue: 0.1,
    });
    minScaleFactor = new FormField({
        id: 'minScaleFactor',
        label: 'Minimum Ölçeklendirme Katsayısı',
        minValue: 0,
    });
    maxScaleFactor = new FormField({
        id: 'maxScaleFactor',
        label: 'Maksimum Ölçeklendirme Katsayısı',
    });
    scalingMethod = new FormField({
        id: 'scalingMethod',
        label: 'Ölçeklendirme Yöntemi',
        choices: scalingMethods,
    });
    spectraType = new FormField({
        id: 'spectraType',
        label: 'Tepki Spektrumu Tipi',
        choices: spectraTypes,
    });
}
