import { InputField } from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import * as tbl from 'components/elements/Table';
import LoadingForm from 'forms/georeport/loading_form';
import { useContext } from 'react';
import DataContext from '../context';

export default function LoadingAccordion() {
    const { analysisOptions, data, setData } = useContext(DataContext);
    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const loadingData = { ...data.loadingData, [name_]: value || '' };
        setData({
            ...data,
            loadingData: loadingData,
        });
    };

    const isHidden = !(
        analysisOptions.structuralInformationPage ||
        analysisOptions.bearingCapacityAnalysis ||
        analysisOptions.settlementAnalysis ||
        analysisOptions.effectiveDepthAnalysis ||
        analysisOptions.swellingPotentialAnalysis ||
        analysisOptions.soilCoefficientAnalysis
    );

    const isHorizontalLoadsHidden = !(
        (analysisOptions.bearingCapacityAnalysis &&
            analysisOptions.bearingCapacityByVesic) ||
        analysisOptions.horizontalSlidingAnalysis
    );

    const form = new LoadingForm(analysisOptions);

    return (
        <Accordion title="Yük Bilgileri" hidden={isHidden} id="loadingData">
            <div
                className="grid grid-cols-2 gap-2"
                style={{ display: isHorizontalLoadsHidden ? 'none' : '' }}
            >
                <InputField
                    formField={form.horizontalLoadX}
                    onChange={handleInputChange}
                    value={data.loadingData.horizontalLoadX}
                />
                <InputField
                    formField={form.horizontalLoadY}
                    onChange={handleInputChange}
                    value={data.loadingData.horizontalLoadY}
                />
            </div>
            <div className="mt-3">
                <tbl.Table>
                    <tbl.TableHead>
                        <tr>
                            <tbl.Th>Yükleme Durumu</tbl.Th>
                            <tbl.Th>
                                <span>σ</span>
                                <sub>min</sub>(<span>t/m</span>
                                <sup>2</sup>)
                            </tbl.Th>
                            <tbl.Th>
                                <span>σ</span>
                                <sub>ort</sub>(<span>t/m</span>
                                <sup>2</sup>)
                            </tbl.Th>
                            <tbl.Th>
                                <span>σ</span>
                                <sub>max</sub>(<span>t/m</span>
                                <sup>2</sup>)
                            </tbl.Th>
                        </tr>
                    </tbl.TableHead>
                    <tbody>
                        <tr>
                            <tbl.Td>G+Q</tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase1Min}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase1Min}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase1Avg}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase1Avg}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase1Max}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase1Max}
                                />
                            </tbl.Td>
                        </tr>
                        <tr>
                            <tbl.Td>1.4G+1.6Q</tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase2Min}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase2Min}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase2Avg}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase2Avg}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase2Max}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase2Max}
                                />
                            </tbl.Td>
                        </tr>
                        <tr>
                            <tbl.Td>G+Q+E/0.9G+E</tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase3Min}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase3Min}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase3Avg}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase3Avg}
                                />
                            </tbl.Td>
                            <tbl.Td>
                                <InputField
                                    formField={form.loadingCase3Max}
                                    onChange={handleInputChange}
                                    value={data.loadingData.loadingCase3Max}
                                />
                            </tbl.Td>
                        </tr>
                    </tbody>
                </tbl.Table>
            </div>
        </Accordion>
    );
}
