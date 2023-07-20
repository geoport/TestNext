import * as api_types from 'types/jet_grout/api_types';
import * as types from 'types/jet_grout/input_types';
import { Loads as LoadingData } from 'types/loading';
import { FoundationData } from 'types/foundation';
import { SeismicData } from 'types/seismicity';
import { SPTLog, SPT } from 'types/spt';
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
): api_types.RequestData {
    const requestData: api_types.RequestData = {
        analysisOptions: inputData.analysisOptions,
        foundationData: convertFoundationData(inputData.foundationData),
        loadingData: convertLoadData(inputData.loadingData),
        seismicData: convertSeismicData(inputData.seismicData),
        sptLog: convertSPTData(inputData.sptLog),
        soilProfile: convertSoilProfile(inputData.soilData),
        jetGroutParams: convertGroutParams(inputData.jetGroutParams),
    };

    return requestData;
}

function convertFoundationData(foundationData: FoundationData): FoundationData {
    const foundation: FoundationData = {
        foundationBaseAngle: convertFloat(foundationData.foundationBaseAngle),
        foundationDepth: convertFloat(foundationData.foundationDepth),
        foundationWidth: convertFloat(foundationData.foundationWidth),
        foundationLength: convertFloat(foundationData.foundationLength),
        slopeAngle: convertFloat(foundationData.slopeAngle),
    };
    return foundation;
}

function convertLoadData(loadData: LoadingData): LoadingData {
    const loads: LoadingData = {
        horizontalLoadX: convertFloat(loadData.horizontalLoadX),
        horizontalLoadY: convertFloat(loadData.horizontalLoadY),
        bearingCapacityLoad: convertFloat(loadData.foundationPressure),
        settlementLoad: convertFloat(loadData.foundationPressure),
    };

    return loads;
}

function convertSeismicData(seismicityData: SeismicData): SeismicData {
    const seismicity: SeismicData = {
        earthquakeMagnitude: convertFloat(seismicityData.earthquakeMagnitude),
        SS: convertFloat(seismicityData.SS),
        S1: convertFloat(seismicityData.S1),
        localSoilClass: seismicityData.localSoilClass,
    };

    return seismicity;
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

function convertGroutParams(
    groutData: types.JetGroutParams,
): types.JetGroutParams {
    const groutParams: types.JetGroutParams = {
        diameter: convertFloat(groutData.diameter) as number,
        elasticModulus: convertFloat(groutData.elasticModulus) as number,
        horizontalSpacing: convertFloat(groutData.horizontalSpacing) as number,
        verticalSpacing: convertFloat(groutData.verticalSpacing) as number,
        poissonsRatio: convertFloat(groutData.poissonsRatio) as number,
        shearModulus: convertFloat(groutData.shearModulus) as number,
        unconfinedCompressiveStrength: convertFloat(
            groutData.unconfinedCompressiveStrength,
        ) as number,
    };
    return groutParams;
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
        soilClass: layers.map((layer) => layer.soilClass as string),
        isCohesive: layers.map((layer) => layer.isCohesive as boolean),
        thickness: mapper('thickness'),
        undrainedShearStrength: mapper('undrainedShearStrength'),
        cohesion: mapper('cohesion'),
        frictionAngle: mapper('frictionAngle'),
        elasticModulus: mapper('elasticModulus'),
        shearModulus: mapper('shearModulus'),
        dryUnitWeight: mapper('dryUnitWeight'),
        saturatedUnitWeight: mapper('saturatedUnitWeight'),
        poissonsRatio: mapper('poissonRatio'),
        plasticityIndex: mapper('plasticityIndex'),
        fineContent: mapper('fineContent'),
        groundWaterLevel: soilData.gwt as number,
        noGwt: soilData.noGWT as boolean,
    };

    return soilProfile;
}
