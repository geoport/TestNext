import { useContext } from 'react';
import DataContext from '../context';
import { GoPrimeResponse } from 'types/georeport/api_types';
import { AnalysisOptions } from 'types/georeport/input_types';
import { Table, TableHead, Th, Td } from 'components/elements/Table';
import {
    LiquefactionByCPT,
    LiquefactionBySPT,
    LiquefactionByVS,
} from 'types/georeport/api_types';
import dynamic from 'next/dynamic';

const DocxViewer = dynamic(() => import('components/elements/DocxViewer'));

export default function ReportTab() {
    const { analysisOptions, output } = useContext(DataContext);
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <DocxViewer reportUrl={output.reportUrl} />
                </div>

                <div>
                    <h1 className="mb-5 text-center text-2xl font-bold">
                        Özet Sonuçlar
                    </h1>
                    {analysisOptions.localSoilClassAnalysis && (
                        <LocalSoilClassTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                    {analysisOptions.liquefactionAnalysis && (
                        <LiquefactionTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                    {analysisOptions.bearingCapacityAnalysis && (
                        <BearingCapacityTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                    {analysisOptions.settlementAnalysis && (
                        <SettlementTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                    {analysisOptions.horizontalSlidingAnalysis && (
                        <HorizontalSlidingTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                    {analysisOptions.soilCoefficientAnalysis && (
                        <SoilCoefficientTable
                            output={output}
                            analysisOptions={analysisOptions}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

type TableProps = {
    output: GoPrimeResponse;
    analysisOptions: AnalysisOptions;
};

// Local Soil Class Table

const LocalSoilClassTable = (props: TableProps) => {
    const { output, analysisOptions } = props;
    const lscResults = output.localSoilClass;
    return (
        <Table>
            <TableHead>
                <tr>
                    <th className="text-center" colSpan={2}>
                        YEREL ZEMİN SINIFI
                    </th>
                </tr>
                <tr>
                    <Th>Hesaplama Yöntemi</Th>
                    <Th>Sonuç</Th>
                </tr>
            </TableHead>
            <tbody>
                {analysisOptions.localSoilClassBySPT && (
                    <tr>
                        <Td>SPT</Td>
                        <Td>{lscResults?.SPT?.soilClass}</Td>
                    </tr>
                )}
                {analysisOptions.localSoilClassByVS && (
                    <tr>
                        <Td>
                            VS<sub>30</sub>
                        </Td>
                        <Td>{lscResults?.VS?.soilClass}</Td>
                    </tr>
                )}
                {analysisOptions.localSoilClassByCu && (
                    <tr>
                        <Td>Cu</Td>
                        <Td>{lscResults?.Cu?.soilClass}</Td>
                    </tr>
                )}
                <tr>
                    <Td>
                        <b>Seçilen</b>
                    </Td>
                    <Td>
                        <b>{lscResults?.localSoilClassSelected}</b>
                    </Td>
                </tr>
            </tbody>
        </Table>
    );
};

// Liquefaction Table

// returns Riskli if any of the values is false else returns Güvenli
const checkLiqSafety = (
    liqResult: LiquefactionBySPT | LiquefactionByVS | LiquefactionByCPT,
): string => {
    const safetyList = liqResult?.commonParams?.isSafe;
    const isSafe = safetyList.every((safety) => safety);
    if (isSafe) {
        return 'Güvenli';
    } else {
        return 'Riskli';
    }
};
const LiquefactionTable = (props: TableProps) => {
    const { output, analysisOptions } = props;
    const liqResults = output.liquefaction;
    return (
        <div className="mt-1">
            <Table>
                <TableHead>
                    <tr>
                        <th className="text-center" colSpan={3}>
                            SIVILAŞMA
                        </th>
                    </tr>
                    <tr>
                        <Th>Hesaplama Yöntemi</Th>
                        <Th>Sıvılaşma Riski</Th>
                        <Th>Oturma(cm)</Th>
                    </tr>
                </TableHead>
                <tbody>
                    {analysisOptions.liquefactionBySPT && (
                        <tr>
                            <Td>SPT</Td>
                            <Td>
                                {checkLiqSafety(
                                    liqResults?.SPT as LiquefactionBySPT,
                                )}
                            </Td>
                            <Td>
                                {liqResults?.SPT?.commonParams?.totalSettlement.toFixed(
                                    2,
                                )}
                            </Td>
                        </tr>
                    )}
                    {analysisOptions.liquefactionByVS && (
                        <tr>
                            <Td>
                                VS<sub>30</sub>
                            </Td>
                            <Td>
                                {checkLiqSafety(
                                    liqResults?.VS as LiquefactionByVS,
                                )}
                            </Td>
                            <Td>
                                {liqResults?.VS?.commonParams?.totalSettlement.toFixed(
                                    2,
                                )}
                            </Td>
                        </tr>
                    )}
                    {analysisOptions.liquefactionByCPT && (
                        <tr>
                            <Td>CPT</Td>
                            <Td>
                                {checkLiqSafety(
                                    liqResults?.CPT as LiquefactionByCPT,
                                )}
                            </Td>
                            <Td>
                                {liqResults?.CPT?.commonParams?.totalSettlement.toFixed(
                                    2,
                                )}
                            </Td>
                        </tr>
                    )}
                    <tr>
                        <Td>
                            <b>Seçilen</b>
                        </Td>
                        <Td>
                            <b>{liqResults?.isSafe ? 'Güvenli' : 'Riskli'}</b>
                        </Td>
                        <Td>{liqResults?.selectedSettlement?.toFixed(2)}</Td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

// Bearing Capacity Table

const checkBC = (bc: any): string | number => {
    if (bc > 0) {
        return bc.toFixed(2);
    } else {
        return '-';
    }
};
const convertSafety = (safety: boolean, bearingCapacity: number): string => {
    if (bearingCapacity == 0) {
        return '-';
    }
    return safety ? 'Güvenli' : 'Riskli';
};
const ParseBC = ({
    bcResult,
    returnSafety,
}: {
    bcResult: any;
    returnSafety: boolean;
}) => {
    const shortTermBC = bcResult?.shortTerm.allowableBearingCapacity as number;
    const longTermBC = bcResult?.longTerm.allowableBearingCapacity as number;
    const shortTermSafety = convertSafety(
        bcResult?.shortTerm.isSafe,
        shortTermBC,
    );
    const longTermSafety = convertSafety(bcResult?.longTerm.isSafe, longTermBC);

    if (returnSafety) {
        return (
            <>
                {shortTermSafety} / {longTermSafety}
            </>
        );
    }
    return (
        <>
            {checkBC(shortTermBC)} / {checkBC(longTermBC)}
        </>
    );
};

const BearingCapacityTable = (props: TableProps) => {
    const { output, analysisOptions } = props;
    const bcResults = output.bearingCapacity;
    const shortTermBC = bcResults?.shortTermBearingCapacity as number;
    const longTermBC = bcResults?.longTermBearingCapacity as number;
    const shortTermSafety = convertSafety(
        bcResults?.isShortTermSafe as boolean,
        shortTermBC,
    );
    const longTermSafety = convertSafety(
        bcResults?.isLongTermSafe as boolean,
        longTermBC,
    );
    return (
        <div className="mt-1">
            <Table>
                <TableHead>
                    <tr>
                        <th className="text-center" colSpan={3}>
                            TAŞIMA KAPASİTESİ
                        </th>
                    </tr>
                    <tr>
                        <Th>Hesaplama Yöntemi</Th>
                        <Th>
                            Kısa Dönem/Uzun Dönem
                            <br />
                            Taşıma Gücü(t/m<sup>2</sup>)
                        </Th>
                        <Th>Sonuç</Th>
                    </tr>
                </TableHead>
                <tbody>
                    {analysisOptions.bearingCapacityByVesic && (
                        <tr>
                            <Td>TBDY 2018</Td>
                            <Td>
                                <ParseBC
                                    bcResult={bcResults?.vesic}
                                    returnSafety={false}
                                />
                            </Td>
                            <Td>
                                <ParseBC
                                    bcResult={bcResults?.vesic}
                                    returnSafety={true}
                                />
                            </Td>
                        </tr>
                    )}
                    {analysisOptions.bearingCapacityByPressuremeter && (
                        <tr>
                            <Td>Presiyometre</Td>
                            <Td>
                                <ParseBC
                                    bcResult={bcResults?.pressureMeter}
                                    returnSafety={false}
                                />
                            </Td>
                            <Td>
                                <ParseBC
                                    bcResult={bcResults?.pressureMeter}
                                    returnSafety={true}
                                />
                            </Td>
                        </tr>
                    )}
                    {analysisOptions.bearingCapacityByVS && (
                        <tr>
                            <Td>Kayma Dalgası Hızı</Td>
                            <Td>
                                {bcResults?.VS?.allowableBearingCapacity.toFixed(
                                    2,
                                )}{' '}
                                /
                                {bcResults?.VS?.allowableBearingCapacity.toFixed(
                                    2,
                                )}
                            </Td>
                            <Td>
                                {bcResults?.VS?.isSafe ? 'Güvenli' : 'Riskli'} /
                                {bcResults?.VS?.isSafe ? 'Güvenli' : 'Riskli'}
                            </Td>
                        </tr>
                    )}
                    {analysisOptions.bearingCapacityByRQD && (
                        <tr>
                            <Td>Nokta Yükleme Deneyi</Td>
                            <Td>
                                {bcResults?.RQD?.allowableBearingCapacity.toFixed(
                                    2,
                                )}{' '}
                                /
                                {bcResults?.RQD?.allowableBearingCapacity.toFixed(
                                    2,
                                )}
                            </Td>
                            <Td>
                                {bcResults?.RQD?.isSafe ? 'Güvenli' : 'Riskli'}{' '}
                                /{bcResults?.RQD?.isSafe ? 'Güvenli' : 'Riskli'}
                            </Td>
                        </tr>
                    )}
                    <tr>
                        <Td>
                            <b>Seçilen</b>
                        </Td>
                        <Td>
                            <b>
                                {checkBC(shortTermBC)} / {checkBC(longTermBC)}
                            </b>
                        </Td>
                        <Td>
                            <b>
                                {shortTermSafety} / {longTermSafety}
                            </b>
                        </Td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

// Settlement Table

const SettlementTable = (props: TableProps) => {
    const { output, analysisOptions } = props;
    const settlementResults = output.settlement;
    const totalElasticSettlement =
        settlementResults?.totalElasticSettlement as number;
    const totalConsolidationSettlement =
        settlementResults?.totalConsolidationSettlement as number;
    const totalSettlement = settlementResults?.totalSettlement as number;

    return (
        <div className="mt-1">
            <Table>
                <TableHead>
                    <tr>
                        <th className="text-center" colSpan={2}>
                            Oturma
                        </th>
                    </tr>
                    <tr>
                        <Th>Oturma Tipi</Th>
                        <Th>Oturma Miktarı(cm)</Th>
                    </tr>
                </TableHead>
                <tbody>
                    {analysisOptions.elasticSettlementAnalysis && (
                        <tr>
                            <Td>Elastik Oturma</Td>
                            <Td>{totalElasticSettlement.toFixed(2)}</Td>
                        </tr>
                    )}
                    {analysisOptions.consolidationSettlementAnalysis && (
                        <tr>
                            <Td>Konsolidasyon Oturması</Td>
                            <Td>{totalConsolidationSettlement.toFixed(2)}</Td>
                        </tr>
                    )}
                    <tr>
                        <Td>
                            <b>Toplam Oturma</b>
                        </Td>
                        <Td>
                            <b>{totalSettlement.toFixed(2)}</b>
                        </Td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

// Horizontal Sliding Table

const HorizontalSlidingTable = (props: TableProps) => {
    const { output } = props;
    const hsResults = output.horizontalSliding;

    return (
        <div className="mt-1">
            <Table>
                <TableHead>
                    <tr>
                        <th className="text-center" colSpan={4}>
                            YATAYDA KAYMA ANALİZİ
                        </th>
                    </tr>
                    <tr>
                        <Th>Yön</Th>
                        <Th>
                            V<sub>th</sub>(t)
                        </Th>
                        <Th>
                            R<sub>th</sub>+0.3*R<sub>pt</sub>(t)
                        </Th>
                        <Th>Sonuç</Th>
                    </tr>
                </TableHead>
                <tbody>
                    <tr>
                        <Td>X</Td>
                        <Td>{hsResults?.VthX.toFixed(2)}</Td>
                        <Td>{hsResults?.sumX.toFixed(2)}</Td>
                        <Td>{hsResults?.isSafeX ? 'Güvenli' : 'Riskli'}</Td>
                    </tr>
                    <tr>
                        <Td>Y</Td>
                        <Td>{hsResults?.VthY.toFixed(2)}</Td>
                        <Td>{hsResults?.sumY.toFixed(2)}</Td>
                        <Td>{hsResults?.isSafeY ? 'Güvenli' : 'Riskli'}</Td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

// Soil Coefficient Table

const SoilCoefficientTable = (props: TableProps) => {
    const { output, analysisOptions } = props;
    const scResults = output.soilCoefficient;

    return (
        <div className="mt-1">
            <Table>
                <TableHead>
                    <tr>
                        <th className="text-center" colSpan={2}>
                            ZEMİN YATAK KATSAYISI
                        </th>
                    </tr>
                    <tr>
                        <Th>Hesaplama Yöntemi</Th>
                        <Th>
                            Yatak Katsayısı(t/m<sup>3</sup>)
                        </Th>
                    </tr>
                </TableHead>
                <tbody>
                    {analysisOptions.soilCoefficientByBearingCapacity && (
                        <tr>
                            <Td>Taşıma Gücü İle</Td>
                            <Td>{scResults?.byBearingCapacity?.toFixed(2)}</Td>
                        </tr>
                    )}
                    {analysisOptions.soilCoefficientBySettlement && (
                        <tr>
                            <Td>Toplam Oturma İle</Td>
                            <Td>{scResults?.bySettlement?.toFixed(2)}</Td>
                        </tr>
                    )}
                    <tr>
                        <Td>
                            <b>Seçilen</b>
                        </Td>
                        <Td>
                            <b>
                                {scResults?.selectedSoilCoefficient?.toFixed(2)}
                            </b>
                        </Td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
