import GmpPredictionForm from 'forms/gmp_prediction/gmp_prediction_form';
import * as fields from 'components/elements/FormFields';
import { getSelected } from 'lib/helper';
import * as types from 'lib/apps/gmp_prediction/types';

const InputForm = ({
    inputData,
    handleChange,
}: {
    inputData: types.InputData;
    handleChange: (e: any) => void;
}) => {
    const form = new GmpPredictionForm();

    return (
        <div className="mt-3 grid grid-cols-2 gap-2">
            <fields.InputField
                formField={form.Mw}
                value={inputData.Mw}
                onChange={handleChange}
            />
            <fields.InputField
                formField={form.VS30}
                value={inputData.VS30}
                onChange={handleChange}
            />
            <fields.InputField
                formField={form.Rrup}
                value={inputData.Rrup}
                onChange={handleChange}
            />
            <fields.InputField
                formField={form.period}
                value={inputData.period}
                onChange={handleChange}
                hide={inputData.outputType != 'SA'}
            />
            <fields.ListBox
                formField={form.faultType}
                selected={getSelected(form.faultType, inputData.faultType)}
                setSelected={(e) =>
                    handleChange({
                        target: { id: 'faultType', value: e.value },
                    })
                }
            />
            <fields.ListBox
                formField={form.outputType}
                selected={getSelected(form.outputType, inputData.outputType)}
                setSelected={(e) =>
                    handleChange({
                        target: { id: 'outputType', value: e.value },
                    })
                }
            />
        </div>
    );
};

export default InputForm;
