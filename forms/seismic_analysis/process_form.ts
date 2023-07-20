import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

const filteringTypes = createMapList(['Butterworth', 'Chebyshev', 'Bessel']);

const filteringFunctions = [
    { value: 'lowpass', key: 'Alçak Geçiren' },
    { value: 'highpass', key: 'Yüksek Geçiren' },
    { value: 'bandpass', key: 'Bant Geçiren' },
    { value: 'bandstop', key: 'Bant Durduran' },
];

export default class ProcessForm extends BaseForm {
    applyBaselineCorrection = new FormField({
        label: 'Taban Çizgisi Düzeltmesi Uygula',
        id: 'applyBaselineCorrection',
    });
    baselineCorrectionOrder = new FormField({
        id: 'baselineCorrectionOrder',
        label: 'Taban Çizgisi Derecesi',
        unit: '0-6',
        minValue: 0,
        maxValue: 6,
    });
    applyFiltering = new FormField({
        label: 'Filtreleme Uygula',
        id: 'applyFiltering',
    });
    filteringType = new FormField({
        id: 'filteringType',
        label: 'Filtreleme Tipi',
        choices: filteringTypes,
    });
    filteringFunction = new FormField({
        id: 'filteringFunction',
        label: 'Filtreleme Fonksiyonu',
        choices: filteringFunctions,
    });
    filterOrder = new FormField({
        id: 'filterOrder',
        label: 'Filtreleme Derecesi',
        minValue: 1,
    });
    lowCornerFrequency = new FormField({
        id: 'lowCornerFrequency',
        label: 'Düşük Köşe Frekansı',
        unit: 'Hz',
        minValue: 0,
    });
    highCornerFrequency = new FormField({
        id: 'highCornerFrequency',
        label: 'Yüksek Köşe Frekansı',
        unit: 'Hz',
        minValue: 0,
    });
}
