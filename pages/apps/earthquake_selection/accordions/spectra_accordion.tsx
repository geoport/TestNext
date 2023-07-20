import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import SpectraForm from 'forms/earthquake_selection/spectra_form';
import { getSelected } from 'lib/helper';
import { useContext } from 'react';
import DataContext from '../context';

export default function SpectraAccordion() {
    const { data, handleInputChange } = useContext(DataContext);
    const spectraForm = new SpectraForm();

    return (
        <Accordion id="spectraData" title="Seçim Parametreleri">
            <div className="grid grid-cols-2 gap-2">
                <fields.BooleanField
                    formField={spectraForm.optimizeAverage}
                    checked={data['optimizeAverage']}
                    setChecked={(e) => handleInputChange(e, 'boolean')}
                />
                <fields.ListBox
                    formField={spectraForm.spectraType}
                    selected={getSelected(
                        spectraForm.spectraType,
                        data.spectraType,
                    )}
                    setSelected={(e) =>
                        handleInputChange({
                            target: { name: 'spectraType', value: e.value },
                        })
                    }
                />
                <fields.InputField
                    formField={spectraForm.SDS}
                    value={data['SDS']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.SD1}
                    value={data['SD1']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.requiredRecordNumber}
                    value={data['requiredRecordNumber']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.maxAllowedStation}
                    value={data['maxAllowedStation']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.minSelectionPeriod}
                    value={data['minSelectionPeriod']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.maxSelectionPeriod}
                    value={data['maxSelectionPeriod']}
                    onChange={handleInputChange}
                />
                <hr className="mt-3 mb-3"></hr>
                <hr className="mt-3 mb-3"></hr>
                <fields.BooleanField
                    formField={spectraForm.allowScaling}
                    checked={data['allowScaling']}
                    setChecked={(e) => handleInputChange(e, 'boolean')}
                />
            </div>
            <div
                className="mt-2 grid grid-cols-2 gap-2"
                style={{ display: data.allowScaling ? '' : 'none' }}
            >
                <fields.ListBox
                    formField={spectraForm.scalingMethod}
                    selected={getSelected(
                        spectraForm.scalingMethod,
                        data.scalingMethod,
                    )}
                    setSelected={(e) =>
                        handleInputChange({
                            target: { name: 'scalingMethod', value: e.value },
                        })
                    }
                />
                <div></div>
                <fields.InputField
                    formField={spectraForm.minScalingPeriod}
                    value={data['minScalingPeriod']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.maxScalingPeriod}
                    value={data['maxScalingPeriod']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.minScaleFactor}
                    value={data['minScaleFactor']}
                    onChange={handleInputChange}
                />
                <fields.InputField
                    formField={spectraForm.maxScaleFactor}
                    value={data['maxScaleFactor']}
                    onChange={handleInputChange}
                />
            </div>
        </Accordion>
    );
}
