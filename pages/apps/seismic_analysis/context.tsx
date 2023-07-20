import { createContext } from 'react';
import { InputData, ContextData } from 'types/seismic_analysis/input_types';
import { OutputData } from 'types/seismic_analysis/api_types';

const DataContext = createContext<ContextData>({
    setData: () => {},
    handleInputChange: () => {},
    inputData: {} as InputData,
    rawOutput: {} as OutputData,
    processedOutput: {} as OutputData,
});

export default DataContext;
