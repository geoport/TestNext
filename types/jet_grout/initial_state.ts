import { InputData } from 'types/jet_grout/input_types';

export const initialState: {
    inputData: InputData;
} = {
    inputData: {
        analysisOptions: {
            enhanceBearingCapacity: true,
            enhanceSettlement: true,
            enhanceLiquefaction: true,
            enhanceSoilParams: true,
            giveReport: true,
            makeOptimization: false,
        },
        projectData: {
            owner: '',
            geotechnicalEngineer: '',
            reportFooter: '',
            reportDate: '',
        },
        buildingData: {
            structuralSystem: '',
            buildingType: '',
            totalFloorNumber: '',
        },
        constructionFieldData: {
            city: 'Adana',
            county: 'Aladağ',
            neighbourhood: 'Akpinar',
            pafta: '',
            ada: '',
            parsel: '',
        },
        loadingData: {
            horizontalLoadX: '',
            horizontalLoadY: '',
            bearingCapacityLoad: '',
            settlementLoad: '',
        },
        foundationData: {
            foundationWidth: '',
            foundationLength: '',
            foundationDepth: '',
            foundationBaseAngle: '',
            foundationArea: '',
            slopeAngle: '',
        },
        soilData: {
            layers: [
                {
                    soilClass: 'GW',
                    soilDefinition: 'İyi Derecelenmiş Çakıl',
                    isCohesive: false,
                    thickness: '',
                    undrainedShearStrength: '',
                    cohesion: '',
                    frictionAngle: '',
                    elasticModulus: '',
                    shearModulus: '',
                    dryUnitWeight: '',
                    saturatedUnitWeight: '',
                    poissonRatio: '',
                    plasticityIndex: '',
                    fineContent: '',
                },
            ],
            gwt: '',
            noGWT: false,
            extendSoilProfile: true,
        },
        seismicData: {
            earthquakeMagnitude: '',
            localSoilClass: 'ZA',
            SS: '',
            S1: '',
        },
        sptLog: {
            energyCorrectionFactor: 1,
            diameterCorrectionFactor: 1,
            samplerCorrectionFactor: 1,
            makeCorrection: true,
            log: [
                {
                    depth: '',
                    N: '',
                },
            ],
        },
        jetGroutParams: {
            elasticModulus: '',
            poissonsRatio: '',
            shearModulus: '',
            diameter: '',
            horizontalSpacing: '',
            verticalSpacing: '',
            unconfinedCompressiveStrength: '',
        },
    },
};
