export interface SoilLayerData {
    geologicTexture?: string;
    soilClass?: string;
    soilClassManual?: string;
    soilDefinition?: string;
    soilDefinitionManual?: string;
    unitWeight?: number | string;
    dryUnitWeight?: number | string;
    saturatedUnitWeight?: number | string;
    thickness?: number | string;
    elasticModulus?: number | string;
    poissonRatio?: number | string;
    volumeCompressibilityCoefficient?: number | string;
    voidRatio?: number | string;
    compressionIndex?: number | string;
    recompressionIndex?: number | string;
    preconsolidationPressure?: number | string;
    undrainedShearStrength?: number | string;
    cohesion?: number | string;
    frictionAngle?: number | string;
    RQD?: number | string;
    IS50?: number | string;
    kp?: number | string;
    shearWaveVelocity?: number | string;
    shearModulus?: number | string;
    fineContent?: number | string;
    liquidLimit?: number | string;
    plasticLimit?: number | string;
    plasticityIndex?: number | string;
    waterContent?: number | string;
    dampingRatio?: number | string;
    isCohesive?: boolean;
}

export interface SoilData {
    layers: SoilLayerData[];
    gwt?: number | string;
    noGWT?: boolean;
    extendSoilProfile?: boolean;
}

export interface SoilProfile {
    soilClass?: string[];
    isCohesive?: boolean[];
    dampingRatio?: number[];
    materialType?: string[];
    thickness?: number[];
    dryUnitWeight?: number[];
    saturatedUnitWeight?: number[];
    unitWeight?: number[];
    fineContent?: number[];
    liquidLimit?: number[];
    plasticLimit?: number[];
    plasticityIndex?: number[];
    undrainedShearStrength?: number[];
    cohesion?: number[];
    frictionAngle?: number[];
    waterContent?: number[];
    poissonsRatio?: number[];
    elasticModulus?: number[];
    voidRatio?: number[];
    recompressionIndex?: number[];
    compressionIndex?: number[];
    preconsolidationPressure?: number[];
    volumeCompressibilityCoefficient?: number[];
    shearWaveVelocity?: number[];
    shearModulus?: number[];
    spt_N?: number[];
    coneResistance?: number[];
    porePressure?: number[];
    RQD?: number[];
    IS50?: number[];
    kp?: number[];
    groundWaterLevel?: number;
    noGwt?: boolean;
}
