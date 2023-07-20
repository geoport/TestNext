import { createContext } from 'react';
import { ContextData, InputData } from 'types/earthquake_selection/input_types';
import { OutputData } from 'types/earthquake_selection/api_types';

const DataContext = createContext<ContextData>({
    data: {} as InputData,
    setData: Function,
    handleInputChange: Function,
    output: {} as OutputData,
    downloadRecordCallback: Function,
});

export default DataContext;
