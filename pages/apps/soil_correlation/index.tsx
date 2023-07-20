import * as btn from 'components/elements/Buttton';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as tab from 'components/elements/Tab';
import { UndrainedShearStrength } from 'components/popovers/Correlation/UndrainedShearStrength';
import { FrictionAngle } from 'components/popovers/Correlation/FrictionAngle';
import { ElasticModulus } from 'components/popovers/Correlation/ElasticModulus';
import { PoissonsRatio } from 'components/popovers/Correlation/PoissonsRatio';
import { CompressionIndex } from 'components/popovers/Correlation/CompressionIndex';
import { RecompressionIndex } from 'components/popovers/Correlation/RecompressionIndex';
import { VolumeCompressibilityCoefficient } from 'components/popovers/Correlation/VolumeCompressibilityCoefficient';
import { ShearModulus } from 'components/popovers/Correlation/ShearModulus';
import { ShearWaveVelocity } from 'components/popovers/Correlation/ShearWaveVelocity';

const ErrorModal = dynamic(() => import('components/modals/error_modal'));
const FailedAnalysisModal = dynamic(
    () => import('components/modals/failed_analysis_modal'),
);

export default function SoilCorrelationPage() {
    const [output, setOutput] = useState({});
    const [showFailedAnalysisModal, setShowFailedAnalysisModal] =
        useState(false);
    const [errorModalContent, setErrorModalContent] = useState({
        title: '',
        content: '',
        show: false,
    });

    const handleSubmit = async () => {};

    return (
        <div className="container min-h-screen text-center">
            <h2 className="mb-10 mt-10 text-2xl">
                <b>Zemin Parametresi Korelasyonları</b>
            </h2>
            <div className="border p-3">
                <tab.TabWrapper vertical={true}>
                    <tab.TabBar vertical={true}>
                        <tab.TabLink title="Drenajsız Kayma Dayanımı" />
                        <tab.TabLink title="İçsel Sürtünme Açısı" />
                        <tab.TabLink title="Elastisite Modülü" />
                        <tab.TabLink title="Poisson Oranı" />
                        <tab.TabLink title="Sıkışma İndisi" />
                        <tab.TabLink title="Yeniden Sıkışma İndisi" />
                        <tab.TabLink title="Hacimsel Sıkışma Katsayısı" />
                        <tab.TabLink title="Kayma Modülü" />
                        <tab.TabLink title="Kesme Dalgası Hızı" />
                    </tab.TabBar>

                    <tab.TabContentWrapper>
                        <tab.TabContent id="undrained_shear_strength_tab">
                            <UndrainedShearStrength
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="friction_angle_tab">
                            <FrictionAngle
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="elastic_modulus_tab">
                            <ElasticModulus
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="poissons_ration_tab">
                            <PoissonsRatio
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="compression_index_tab">
                            <CompressionIndex
                                soilClass="A-2-4"
                                showOutput={true}
                            />
                        </tab.TabContent>
                        <tab.TabContent id="recompression_index_tab">
                            <RecompressionIndex
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="volume_compressibility_tab">
                            <VolumeCompressibilityCoefficient
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                        <tab.TabContent id="shear_modulus_tab">
                            <ShearModulus showOutput={true} soilClass="A-2-4" />
                        </tab.TabContent>
                        <tab.TabContent id="shear_wave_velocity_tab">
                            <ShearWaveVelocity
                                showOutput={true}
                                soilClass="A-2-4"
                            />
                        </tab.TabContent>
                    </tab.TabContentWrapper>
                </tab.TabWrapper>
            </div>

            {errorModalContent.show && (
                <ErrorModal
                    modalContent={errorModalContent}
                    setModalContent={setErrorModalContent}
                />
            )}
            {showFailedAnalysisModal && (
                <FailedAnalysisModal
                    setModalContent={setShowFailedAnalysisModal}
                    showModal={showFailedAnalysisModal}
                />
            )}
        </div>
    );
}
