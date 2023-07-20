import { createContext } from 'react';
import * as inputTypes from 'types/ground_response_analysis/input_types';
import { OutputData } from 'types/ground_response_analysis/api_types';

const DataContext = createContext<inputTypes.ContextData>({
    data: {} as inputTypes.InputData,
    setData: () => {},
    output: {} as OutputData,
    setOutput: () => {},
    showFailedAnalysisModal: false,
    setShowFailedAnalysisModal: () => {},
    errorModalContent: {
        title: '',
        content: '',
        show: false,
    },
    setErrorModalContent: () => {},
    handleInputChange: () => {},
});

export default DataContext;
