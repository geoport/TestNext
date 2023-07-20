import { createContext } from 'react';
import {
    AnalysisOptions,
    InputData,
    ContextData,
} from 'types/georeport/input_types';
import { GoPrimeResponse } from 'types/georeport/api_types';

const DataContext = createContext<ContextData>({
    data: {} as InputData,
    setData: Function,
    analysisOptions: {} as AnalysisOptions,
    output: {} as GoPrimeResponse,
});

export default DataContext;
