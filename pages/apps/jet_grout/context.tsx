import { createContext } from 'react';
import { InputData } from 'types/jet_grout/input_types';
import { ContextData, OutputData } from 'types/jet_grout/api_types';

const DataContext = createContext<ContextData>({
    data: {} as InputData,
    setData: Function,
    output: {} as OutputData,
});

export default DataContext;
