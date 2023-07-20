import { InputData } from './input_types';

export const initialState: InputData = {
    firstRowNo: 1,
    lastRowNo: '',
    timeStep: '',
    scaleFactor: 1,
    dataType: 'acc',
    accUnit: 'g',
    velUnit: 'cm/sn',
    dispUnit: 'cm',
    data: [],
    applyBaselineCorrection: false,
    baselineCorrectionOrder: '',
    applyFiltering: false,
    filterOrder: '',
    filteringType: 'Butterworth',
    filteringFunction: 'bandpass',
    lowCornerFrequency: '',
    highCornerFrequency: '',
};
