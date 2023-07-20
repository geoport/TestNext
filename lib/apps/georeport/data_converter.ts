import * as api_types from 'types/georeport/api_types';
import * as types from 'types/georeport/input_types';
import { Loads as LoadingData } from 'types/loading';
import { FoundationData } from 'types/foundation';
import { SeismicData } from 'types/seismicity';
import { CPTData, CPT } from 'types/cpt';
import { SPTLog, SPT } from 'types/spt';
import { MASWData, MASW } from 'types/masw';
import { PressuremeterData, Pressuremeter } from 'types/pressuremeter';
import { SoilProfile, SoilLayerData, SoilData } from 'types/soil_profile';

const convertFloat = (
    value: string | undefined | number,
): number | undefined => {
    if (value === '' || value === undefined) {
        return undefined;
    }
    if (typeof value === 'number') {
        return value;
    }
    return parseFloat(value);
};

export default function convertInputData(
    inputData: types.InputData,
    analysisOptions: types.AnalysisOptions,
): api_types.RequestData {
    const analysisOptions_: api_types.AnalysisOptions = {
        ...analysisOptions,
        soilCoefficientSelectedValue: 'MIN',
        bearingCapacitySelectedValue: 'MIN',
    };

    const requestData: api_types.RequestData = {
        analysisOptions: analysisOptions_,
        foundation: convertFoundationData(inputData.foundationData),
        loads: convertLoadData(inputData.loadingData, analysisOptions),
        seismicity: convertSeismicData(inputData.seismicData),
        fieldTests: convertFieldTests(inputData.siteInvestigationData),
        soilProfile: convertSoilProfile(inputData.soilProfile),
    };

    return requestData;
}

function getLoad(
    loadingCase: string,
    loadingValue: string,
    loadData: LoadingData,
): number {
    let load;
    switch (loadingCase) {
        case 'G+Q':
            if (loadingValue === 'minimum') {
                load = loadData.loadingCase1Min;
            } else if (loadingValue === 'maksimum') {
                load = loadData.loadingCase1Max;
            } else {
                load = loadData.loadingCase1Avg;
            }
        case '1.4G+1.6Q':
            if (loadingValue === 'minimum') {
                load = loadData.loadingCase2Min;
            } else if (loadingValue === 'maksimum') {
                load = loadData.loadingCase2Max;
            } else {
                load = loadData.loadingCase2Avg;
            }
        default:
            if (loadingValue === 'minimum') {
                load = loadData.loadingCase3Min;
            } else if (loadingValue === 'maksimum') {
                load = loadData.loadingCase3Max;
            } else {
                load = loadData.loadingCase3Avg;
            }
    }

    return parseFloat(load as string);
}

function convertFoundationData(foundationData: FoundationData): FoundationData {
    let surfaceFrictionCoefficient;
    switch (foundationData.foundationSurfaceType) {
        case 'Yerinde Dökme Beton – Sıkıştırılmış Temel Taban Zemini':
            surfaceFrictionCoefficient = 0.6;
            break;
        case 'Önüretimli Beton – Sıkıştırılmış Temel Taban Zemini':
            surfaceFrictionCoefficient = 0.4;
            break;
        case 'Yerinde Dökme Beton – Beton':
            surfaceFrictionCoefficient = 0.5;
            break;
        default:
            surfaceFrictionCoefficient = 0.5;
            break;
    }
    const foundation: FoundationData = {
        foundationBaseAngle: convertFloat(foundationData.foundationBaseAngle),
        foundationDepth: convertFloat(foundationData.foundationDepth),
        foundationWidth: convertFloat(foundationData.foundationWidth),
        foundationLength: convertFloat(foundationData.foundationLength),
        slopeAngle: convertFloat(foundationData.slopeAngle),
        surfaceFrictionCoefficient,
    };
    return foundation;
}

function convertLoadData(
    loadData: LoadingData,
    options: types.AnalysisOptions,
): LoadingData {
    const loads: LoadingData = {
        horizontalLoadX: convertFloat(loadData.horizontalLoadX),
        horizontalLoadY: convertFloat(loadData.horizontalLoadY),
        bearingCapacityLoad: getLoad(
            options.bearingCapacityLoadingCase,
            options.bearingCapacityLoadingValue,
            loadData,
        ),
        settlementLoad: getLoad(
            options.settlementLoadingCase,
            options.settlementLoadingValue,
            loadData,
        ),
        effectiveDepthLoad: getLoad(
            options.effectiveDepthLoadingCase,
            options.effectiveDepthLoadingValue,
            loadData,
        ),
        swellingPotentialLoad: getLoad(
            options.swellingPotentialLoadingCase,
            options.swellingPotentialLoadingValue,
            loadData,
        ),
    };

    return loads;
}

function convertSeismicData(seismicityData: SeismicData): SeismicData {
    const pga =
        seismicityData[
            `PGA_${seismicityData.dyhd?.replace('-', '')}` as keyof SeismicData
        ];
    const SS =
        seismicityData[
            `SS_${seismicityData.dyhd?.replace('-', '')}` as keyof SeismicData
        ];
    const S1 =
        seismicityData[
            `S1_${seismicityData.dyhd?.replace('-', '')}` as keyof SeismicData
        ];

    const seismicity: SeismicData = {
        earthquakeMagnitude: convertFloat(seismicityData.earthquakeMagnitude),
        PGA: convertFloat(pga),
        SS: convertFloat(SS),
        S1: convertFloat(S1),
        localSoilClass: seismicityData.localSoilClass,
    };

    return seismicity;
}

function convertFieldTests(
    fieldTestData: types.SiteInvestigaionData,
): api_types.FieldTests {
    const fieldTests: api_types.FieldTests = {
        cpt: convertCPTData(fieldTestData.cptData),
        spt: convertSPTData(fieldTestData.sptData),
        masw: convertMASWData(fieldTestData.maswData),
        pressuremeter: convertPressuremeterData(
            fieldTestData.pressuremeterData,
        ),
    };

    return fieldTests;
}

function convertCPTData(cptData: CPTData[]): CPT {
    const depth: number[] = [];
    const coneResistance: number[] = [];

    if (cptData[0].depth !== '') {
        for (let i = 0; i < cptData.length; i++) {
            depth.push(parseFloat(cptData[i].depth as string));
            coneResistance.push(
                parseFloat(cptData[i].coneResistance as string),
            );
        }
    }
    const cpt: CPT = {
        depth,
        coneResistance,
    };

    return cpt;
}

function convertSPTData(sptData: SPTLog): SPT {
    const depth: number[] = [];
    const N: number[] = [];

    if (sptData.log[0].depth !== '') {
        for (let i = 0; i < sptData.log.length; i++) {
            depth.push(parseFloat(sptData.log[i].depth as string));
            N.push(parseFloat(sptData.log[i].N as string));
        }
    }
    const spt: SPT = {
        depth,
        N,
        energyCorrectionFactor: sptData.energyCorrectionFactor,
        diameterCorrectionFactor: sptData.diameterCorrectionFactor,
        samplerCorrectionFactor: sptData.samplerCorrectionFactor,
        makeCorrection: sptData.makeCorrection,
    };

    return spt;
}

function convertMASWData(maswData: MASWData[]): MASW {
    const thickness: number[] = [];
    const shearWaveVelocity: number[] = [];
    const compressionWaveVelocity: number[] = [];

    if (maswData[0].thickness !== '') {
        for (let i = 0; i < maswData.length; i++) {
            thickness.push(parseFloat(maswData[i].thickness as string));
            shearWaveVelocity.push(
                parseFloat(maswData[i].shearWaveVelocity as string),
            );
            compressionWaveVelocity.push(
                parseFloat(maswData[i].compressionalWaveVelocity as string),
            );
        }
    }
    const masw: MASW = {
        thickness,
        shearWaveVelocity,
        compressionWaveVelocity,
    };

    return masw;
}

function convertPressuremeterData(
    pressuremeterData: PressuremeterData[],
): Pressuremeter {
    const depth: number[] = [];
    const limitPressure: number[] = [];
    const netLimitPressure: number[] = [];

    if (pressuremeterData[0].depth !== '') {
        for (let i = 0; i < pressuremeterData.length; i++) {
            depth.push(parseFloat(pressuremeterData[i].depth as string));
            limitPressure.push(
                parseFloat(pressuremeterData[i].limitPressure as string),
            );
            netLimitPressure.push(
                parseFloat(pressuremeterData[i].netLimitPressure as string),
            );
        }
    }
    const pressureMeter: Pressuremeter = {
        depth,
        limitPressure,
        netLimitPressure,
    };

    return pressureMeter;
}

function convertSoilProfile(soilData: SoilData): SoilProfile {
    const layers = soilData.layers;
    const mapper = (param: string) => {
        const paramList: number[] = [];
        for (const layer of layers) {
            const val = layer[param as keyof SoilLayerData];
            if (val !== '') {
                paramList.push(parseFloat(val as string));
            }
        }
        return paramList;
    };

    const soilProfile: SoilProfile = {
        groundWaterLevel: soilData.gwt as number,
        noGwt: soilData.noGWT as boolean,
        soilClass: layers.map((layer) => layer.soilClass as string),
        isCohesive: layers.map((layer) => layer.isCohesive as boolean),
        thickness: mapper('thickness'),
        dryUnitWeight: mapper('dryUnitWeight'),
        saturatedUnitWeight: mapper('saturatedUnitWeight'),
        fineContent: mapper('fineContent'),
        liquidLimit: mapper('liquidLimit'),
        plasticLimit: mapper('plasticLimit'),
        plasticityIndex: mapper('plasticityIndex'),
        undrainedShearStrength: mapper('undrainedShearStrength'),
        cohesion: mapper('cohesion'),
        frictionAngle: mapper('frictionAngle'),
        waterContent: mapper('waterContent'),
        poissonsRatio: mapper('poissonRatio'),
        elasticModulus: mapper('elasticModulus'),
        voidRatio: mapper('voidRatio'),
        recompressionIndex: mapper('recompressionIndex'),
        compressionIndex: mapper('compressionIndex'),
        preconsolidationPressure: mapper('preconsolidationPressure'),
        volumeCompressibilityCoefficient: mapper(
            'volumeCompressibilityCoefficient',
        ),
        shearWaveVelocity: mapper('shearWaveVelocity'),
        RQD: mapper('RQD'),
        IS50: mapper('IS50'),
        kp: mapper('kp'),
    };

    return soilProfile;
}
