import React from 'react';
import SavedProjectsList from 'components/elements/SavedProjectsList';
import * as fields from 'components/elements/FormFields';
import * as forms from 'forms/georeport/analysis_options_form';
import * as tab from 'components/elements/Tab';
import { BorderButton } from 'components/elements/Buttton';
import { AnalysisOptions } from 'types/georeport/input_types';
import { FormField } from 'models/FormField';
import TemplateList from 'components/elements/TemplateList';

export default function AnalysisTab(props: {
    analysisOptions: AnalysisOptions;
    setAnalysisOptions: React.Dispatch<React.SetStateAction<AnalysisOptions>>;
    setOutput: React.Dispatch<React.SetStateAction<any>>;
    savedProjects: any[];
    selectedProject: any;
    setSelectedProject: React.Dispatch<React.SetStateAction<any>>;
    setShowReportTab: React.Dispatch<React.SetStateAction<boolean>>;
    templates: any[];
    selectedTemplate: string;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<any>>;
    onLoadProject: () => void;
}) {
    const { analysisOptions, setAnalysisOptions } = props;
    const handleChange = (e: any) => {
        const { name, checked } = e.target;
        setAnalysisOptions((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSelect = (isSelected: boolean) => {
        let newOptions = { ...analysisOptions };
        for (const key of Object.keys(analysisOptions)) {
            if (
                typeof analysisOptions[key as keyof AnalysisOptions] ===
                'boolean'
            ) {
                newOptions = { ...newOptions, [key]: isSelected };
            }
        }
        setAnalysisOptions(newOptions);
        props.setOutput({});
        props.setShowReportTab(false);
    };
    return (
        <div>
            <SavedProjectsList
                projects={props.savedProjects}
                selectedProject={props.selectedProject}
                setSelectedProject={props.setSelectedProject}
                onLoadProject={props.onLoadProject}
            />
            <TemplateList
                templates={props.templates}
                selectedTemplate={props.selectedTemplate}
                setSelectedTemplate={props.setSelectedTemplate}
            />
            <p>
                <b>Raporda Yer Almasını İstediğiniz Bölümleri İşaretleyiniz</b>
            </p>
            <div className="flex flex-row">
                <div className="mr-3">
                    <BorderButton onClick={() => handleSelect(true)}>
                        Tümünü Seç
                    </BorderButton>
                </div>
                <div>
                    <BorderButton onClick={() => handleSelect(false)}>
                        Tümünü Kaldır
                    </BorderButton>
                </div>
            </div>
            <hr className="mt-3" />
            <div className="mt-3 grid grid-cols-2 gap-2">
                <AnalysisOptions
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                />
                <div>
                    <tab.TabWrapper vertical={true}>
                        <tab.TabBar vertical={true}>
                            <tab.TabLink
                                title="Yerel Zemin Sınıfı"
                                hide={!analysisOptions.localSoilClassAnalysis}
                            />
                            <tab.TabLink
                                title="Sıvılaşma"
                                hide={!analysisOptions.liquefactionAnalysis}
                            />
                            <tab.TabLink
                                title="Taşıma Kapasitesi"
                                hide={
                                    !(
                                        analysisOptions.bearingCapacityAnalysis ||
                                        analysisOptions.soilCoefficientByBearingCapacity
                                    )
                                }
                            />
                            <tab.TabLink
                                title="Oturma"
                                hide={
                                    !(
                                        analysisOptions.settlementAnalysis ||
                                        analysisOptions.soilCoefficientBySettlement
                                    )
                                }
                            />
                            <tab.TabLink
                                title="Yatak Katsayısı"
                                hide={!analysisOptions.soilCoefficientAnalysis}
                            />
                            <tab.TabLink
                                title="Şişme Potansiyeli"
                                hide={
                                    !analysisOptions.swellingPotentialAnalysis
                                }
                            />
                            <tab.TabLink
                                title="Sondaj Derinliği"
                                hide={!analysisOptions.effectiveDepthAnalysis}
                            />
                        </tab.TabBar>
                        <tab.TabContentWrapper>
                            <tab.TabContent id="local_soil_class_tab">
                                <LocalSoilClassOptions
                                    analysisOptions={analysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="liquefaction_tab">
                                <LiquefactionOptions
                                    analysisOptions={analysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="bearing_capacity_tab">
                                <BearingCapacityOptions
                                    analysisOptions={analysisOptions}
                                    setAnalysisOptions={setAnalysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="settlement_tab">
                                <SettlementOptions
                                    analysisOptions={analysisOptions}
                                    setAnalysisOptions={setAnalysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="soil_coefficient_tab">
                                <SoilCoefficientOptions
                                    analysisOptions={analysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="swelling_potential_tab">
                                <SwellingPotentialOptions
                                    analysisOptions={analysisOptions}
                                    setAnalysisOptions={setAnalysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                            <tab.TabContent id="effective_depth_tab">
                                <EffectiveDepthOptions
                                    analysisOptions={analysisOptions}
                                    setAnalysisOptions={setAnalysisOptions}
                                    handleChange={handleChange}
                                />
                            </tab.TabContent>
                        </tab.TabContentWrapper>
                    </tab.TabWrapper>
                </div>
            </div>
        </div>
    );
}

type LoadingComponentProps = {
    selectedLoadingCase: string;
    selectedLoadingValue: string;
    setAnalysisOptions: React.Dispatch<React.SetStateAction<AnalysisOptions>>;
    id: string;
};
const LoadingComponent = (props: LoadingComponentProps) => {
    const {
        selectedLoadingCase,
        selectedLoadingValue,
        setAnalysisOptions,
        id,
    } = props;
    const form = new forms.LoadingForm();

    const handleCaseChange = (e: any) => {
        setAnalysisOptions((prevState) => ({
            ...prevState,
            [`${id}LoadingCase`]: e.value,
        }));
    };
    const handleValueChange = (e: any) => {
        setAnalysisOptions((prevState) => ({
            ...prevState,
            [`${id}LoadingValue`]: e.value,
        }));
    };
    return (
        <div className="grid grid-cols-2 gap-2">
            <fields.ListBox
                formField={form.loadingCase}
                selected={selectedLoadingCase}
                setSelected={handleCaseChange}
            />
            <fields.ListBox
                formField={form.loadingValue}
                selected={selectedLoadingValue}
                setSelected={handleValueChange}
            />
        </div>
    );
};

type ListedCheckBoxProps = {
    formField: FormField;
    analysisOptions: AnalysisOptions;
    handleChange: (e: any) => void;
};
const ListedCheckBox = (props: ListedCheckBoxProps) => {
    const { formField, analysisOptions, handleChange } = props;
    return (
        <li className="mb-3">
            <fields.BooleanField
                checked={
                    analysisOptions[
                        formField.id as keyof AnalysisOptions
                    ] as boolean
                }
                formField={formField}
                setChecked={handleChange}
            />
        </li>
    );
};

type AnalysisOptionsProps = {
    analysisOptions: AnalysisOptions;
    handleChange: (e: any) => void;
    setAnalysisOptions?: React.Dispatch<React.SetStateAction<AnalysisOptions>>;
};
function AnalysisOptions({
    analysisOptions,
    handleChange,
}: AnalysisOptionsProps) {
    const form = new forms.AnalysisOptionsForm();

    return (
        <div className="ml-5 border-r">
            <ol className="list-roman">
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.coverPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.contentPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.figuresTablesPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.approvalsPage}
                />
            </ol>
            <ol className="list-decimal">
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.introductionPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.constructionFieldPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.structuralInformationPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.soilInvestigationPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.additionalSoilInvestigationPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.idealizedSoilPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.parameterSelectionPage}
                />
                <li>
                    Depremsellik
                    <ol className="ml-5 list-decimal">
                        <ListedCheckBox
                            analysisOptions={analysisOptions}
                            handleChange={handleChange}
                            formField={form.designSpectrumAnalysis}
                        />
                        <ListedCheckBox
                            analysisOptions={analysisOptions}
                            handleChange={handleChange}
                            formField={form.localSoilClassAnalysis}
                        />
                        <ListedCheckBox
                            analysisOptions={analysisOptions}
                            handleChange={handleChange}
                            formField={form.liquefactionAnalysis}
                        />
                    </ol>
                </li>
                <li>
                    Yapı Zemin Etkileşiminin İrdelenmesi
                    <ol className="ml-5 list-decimal">
                        <li>
                            Temel Sistemine İlişkin Geoteknik Analiz ve
                            Değerlendirme
                        </li>
                        <ol className="ml-5 list-decimal">
                            <li>
                                Yüzeysel Temeller
                                <ol className="ml-5 list-decimal">
                                    <ListedCheckBox
                                        analysisOptions={analysisOptions}
                                        handleChange={handleChange}
                                        formField={form.settlementAnalysis}
                                    />
                                    <ListedCheckBox
                                        analysisOptions={analysisOptions}
                                        handleChange={handleChange}
                                        formField={
                                            form.horizontalSlidingAnalysis
                                        }
                                    />
                                    <ListedCheckBox
                                        analysisOptions={analysisOptions}
                                        handleChange={handleChange}
                                        formField={form.bearingCapacityAnalysis}
                                    />
                                    <ListedCheckBox
                                        analysisOptions={analysisOptions}
                                        handleChange={handleChange}
                                        formField={form.soilCoefficientAnalysis}
                                    />
                                    <ListedCheckBox
                                        analysisOptions={analysisOptions}
                                        handleChange={handleChange}
                                        formField={form.effectiveDepthAnalysis}
                                    />
                                </ol>
                            </li>
                            <ListedCheckBox
                                analysisOptions={analysisOptions}
                                handleChange={handleChange}
                                formField={form.deepFoundationPage}
                            />
                        </ol>
                        <ListedCheckBox
                            analysisOptions={analysisOptions}
                            handleChange={handleChange}
                            formField={form.groundImprovementPage}
                        />
                        <ListedCheckBox
                            analysisOptions={analysisOptions}
                            handleChange={handleChange}
                            formField={form.foundationSuggestionPage}
                        />
                        <li>
                            Yapı Temelleriyle İlgili Diğer Hususlar
                            <ol className="ml-5 list-decimal">
                                <ListedCheckBox
                                    analysisOptions={analysisOptions}
                                    handleChange={handleChange}
                                    formField={form.swellingPotentialAnalysis}
                                />
                            </ol>
                        </li>
                    </ol>
                </li>
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.retainingSystemsPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.resultsPage}
                />
                <ListedCheckBox
                    analysisOptions={analysisOptions}
                    handleChange={handleChange}
                    formField={form.referancesPage}
                />
            </ol>
        </div>
    );
}

function LocalSoilClassOptions({
    analysisOptions,
    handleChange,
}: AnalysisOptionsProps) {
    const form = new forms.LocalSoilClassForm();
    return (
        <div>
            <h4 className="mb-8">
                <b>Yerel Zemin Sınıfı Analizi Ayarları</b>
            </h4>
            <fields.BooleanField
                checked={analysisOptions['localSoilClassBySPT']}
                formField={form.localSoilClassBySPT}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['localSoilClassByVS']}
                formField={form.localSoilClassByVS}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['localSoilClassByCu']}
                formField={form.localSoilClassByCu}
                setChecked={handleChange}
            />
        </div>
    );
}

function LiquefactionOptions({
    analysisOptions,
    handleChange,
}: AnalysisOptionsProps) {
    const form = new forms.LiquefactionForm();
    return (
        <div>
            <h4 className="mb-8">
                <b>Sıvılaşma Analizi Ayarları</b>
            </h4>
            <fields.BooleanField
                checked={analysisOptions['liquefactionBySPT']}
                formField={form.liquefactionBySPT}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['liquefactionByCPT']}
                formField={form.liquefactionByCPT}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['liquefactionByVS']}
                formField={form.liquefactionByVS}
                setChecked={handleChange}
            />
        </div>
    );
}

function BearingCapacityOptions({
    analysisOptions,
    handleChange,
    setAnalysisOptions,
}: AnalysisOptionsProps) {
    const form = new forms.BearingCapacityForm();
    return (
        <div>
            <h4 className="mb-8">
                <b>Taşıma Kapasitesi Analizi Ayarları</b>
            </h4>
            <LoadingComponent
                id="bearingCapacity"
                selectedLoadingCase={analysisOptions.bearingCapacityLoadingCase}
                selectedLoadingValue={
                    analysisOptions.bearingCapacityLoadingValue
                }
                setAnalysisOptions={setAnalysisOptions as any}
            />
            <hr className="mb-3" />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityByVesic']}
                formField={form.bearingCapacityByVesic}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityByVS']}
                formField={form.bearingCapacityByVS}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityByPressuremeter']}
                formField={form.bearingCapacityByPressuremeter}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityByRQD']}
                formField={form.bearingCapacityByRQD}
                setChecked={handleChange}
            />
            <hr className="mb-3 mt-3" />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityShortTerm']}
                formField={form.bearingCapacityShortTerm}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['bearingCapacityLongTerm']}
                formField={form.bearingCapacityLongTerm}
                setChecked={handleChange}
            />
        </div>
    );
}

function SettlementOptions({
    analysisOptions,
    handleChange,
    setAnalysisOptions,
}: AnalysisOptionsProps) {
    const form = new forms.SettlementForm();
    const handleMethodChange = (e: any) => {
        setAnalysisOptions?.((prevState: any) => ({
            ...prevState,
            ['consolidationSettlementMethod']: e.value,
        }));
    };
    const getSelectedMethod = () => {
        switch (analysisOptions.consolidationSettlementMethod) {
            case 'MV':
                return 'Hacimsel sıkışma katsayısı ile';
            case 'GP':
                return 'Ön yükleme basıncı ile';
            default:
                return 'Hacimsel sıkışma katsayısı ile';
        }
    };
    return (
        <div>
            <h4 className="mb-8">
                <b>Oturma Analizi Ayarları</b>
            </h4>
            <LoadingComponent
                id="settlement"
                selectedLoadingCase={
                    analysisOptions.settlementLoadingCase || 'G+Q+E/0.9G+E'
                }
                selectedLoadingValue={
                    analysisOptions.settlementLoadingValue || 'ortalama'
                }
                setAnalysisOptions={setAnalysisOptions as any}
            />
            <hr className="mb-3" />
            <fields.BooleanField
                checked={analysisOptions['elasticSettlementAnalysis']}
                formField={form.elasticSettlementAnalysis}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['consolidationSettlementAnalysis']}
                formField={form.consolidationSettlementAnalysis}
                setChecked={handleChange}
            />
            <fields.ListBox
                formField={form.consolidationMethod}
                selected={getSelectedMethod()}
                setSelected={handleMethodChange}
            />
        </div>
    );
}

function SoilCoefficientOptions({
    analysisOptions,
    handleChange,
}: AnalysisOptionsProps) {
    const form = new forms.SoilCoefficientForm();

    return (
        <div>
            <h4 className="mb-8">
                <b>Yatak Katsayısı Analizi Ayarları</b>
            </h4>
            <fields.BooleanField
                checked={analysisOptions['soilCoefficientBySettlement']}
                formField={form.soilCoefficientBySettlement}
                setChecked={handleChange}
            />
            <fields.BooleanField
                checked={analysisOptions['soilCoefficientByBearingCapacity']}
                formField={form.soilCoefficientByBearingCapacity}
                setChecked={handleChange}
            />
        </div>
    );
}

function SwellingPotentialOptions({
    analysisOptions,
    setAnalysisOptions,
}: AnalysisOptionsProps) {
    return (
        <div>
            <h4 className="mb-8">
                <b>Şişme Potansiyeli Analizi Ayarları</b>
            </h4>
            <LoadingComponent
                id="swellingPotential"
                selectedLoadingCase={
                    analysisOptions.swellingPotentialLoadingCase
                }
                selectedLoadingValue={
                    analysisOptions.swellingPotentialLoadingValue
                }
                setAnalysisOptions={setAnalysisOptions as any}
            />
        </div>
    );
}

function EffectiveDepthOptions({
    analysisOptions,
    setAnalysisOptions,
}: AnalysisOptionsProps) {
    return (
        <div>
            <h4 className="mb-8">
                <b>Sondaj Derinliği Analizi Ayarları</b>
            </h4>
            <LoadingComponent
                id="effectiveDepth"
                selectedLoadingCase={analysisOptions.effectiveDepthLoadingCase}
                selectedLoadingValue={
                    analysisOptions.effectiveDepthLoadingValue
                }
                setAnalysisOptions={setAnalysisOptions as any}
            />
        </div>
    );
}
