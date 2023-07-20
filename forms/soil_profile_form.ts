import { FormField } from 'models/FormField';
import SoilClassMap from 'data/soil_classes.json';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export default class SoilProfileFormBase extends BaseForm {
    noGWT = new FormField({
        id: 'noGWT',
        label: 'Yeraltı su seviyesine rastlanmamıştır',
    });
    gwt = new FormField({
        id: 'gwt',
        label: 'Yeraltı Su Seviyesi',
        unit: 'm',
        minValue: 0,
    });
    soilClass = new FormField({
        id: 'soilClass',
        label: 'Zemin Sınıfı',
        choices: createMapList(SoilClassMap.soilClasses),
    });
    soilDefinition = new FormField({
        id: 'soilDefinition',
        label: 'Zemin Sınıfı Tanımı',
    });
    soilClassManual = new FormField({
        id: 'soilClassManual',
        label: 'Zemin Sınıfı',
        type: 'text',
    });
    soilDefinitionManual = new FormField({
        id: 'soilDefinitionManual',
        label: 'Zemin Sınıfı Tanımı',
        type: 'text',
    });
    geologicTexture = new FormField({
        id: 'geologicTexture',
        label: 'Zemin Jeolojik Kesit Dokusu',
        choices: createMapList(SoilClassMap.geologicTextures),
    });
    dryUnitWeight = new FormField({
        id: 'dryUnitWeight',
        label: 'Kuru Birim Hacim Ağırlığı',
        unit: 't/m<sup>3</sup>',
        minValue: 1,
    });
    saturatedUnitWeight = new FormField({
        id: 'saturatedUnitWeight',
        label: 'Doygun Birim Hacim Ağırlığı',
        unit: 't/m<sup>3</sup>',
        minValue: 1,
    });
    unitWeight = new FormField({
        id: 'unitWeight',
        label: 'Doğal Birim Hacim Ağırlığı',
        unit: 't/m<sup>3</sup>',
        minValue: 1,
    });
    thickness = new FormField({
        id: 'thickness',
        label: 'Tabaka Kalınlığı',
        unit: 'm',
        minValue: 0.0001,
    });
    elasticModulus = new FormField({
        id: 'elasticModulus',
        label: 'Elastisite Modülü',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    poissonRatio = new FormField({
        id: 'poissonRatio',
        label: 'Poisson Oranı',
        minValue: 0,
    });
    voidRatio = new FormField({
        id: 'voidRatio',
        label: 'Boşluk Oranı',
        minValue: 0,
    });
    volumeCompressibilityCoefficient = new FormField({
        id: 'volumeCompressibilityCoefficient',
        label: 'Hacimsel Sıkışma Katsayısı',
        unit: 'm<sup>2</sup>/t',
        minValue: 0,
    });
    compressionIndex = new FormField({
        id: 'compressionIndex',
        label: 'Sıkışma İndisi',
        minValue: 0,
    });
    recompressionIndex = new FormField({
        id: 'recompressionIndex',
        label: 'Yeniden Sıkışma İndisi',
        minValue: 0,
    });
    preconsolidationPressure = new FormField({
        id: 'preconsolidationPressure',
        label: 'Ön Yükleme Basıncı',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    undrainedShearStrength = new FormField({
        id: 'undrainedShearStrength',
        label: 'Drenajsız Kayma Dayanımı',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    cohesion = new FormField({
        id: 'cohesion',
        label: 'Kohezyon',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    frictionAngle = new FormField({
        id: 'frictionAngle',
        label: 'İçsel Sürtünme Açısı',
        minValue: 0,
    });
    IS50 = new FormField({
        id: 'IS50',
        label: 'Kaya Yük Dayanımı,IS50',
        unit: 't/m<sup>2</sup>',
        minValue: 0,
    });
    kp = new FormField({
        id: 'kp',
        label: 'Kaya Yük Dayanımı,k<sub>p</sub>',
        minValue: 0,
    });
    RQD = new FormField({
        id: 'RQD',
        label: 'Kaya Kalite Göstergesi,RQD',
        unit: '%',
        minValue: 0,
    });
    shearWaveVelocity = new FormField({
        id: 'shearWaveVelocity',
        label: 'Kayma Dalgası Hızı',
        minValue: 0,
        unit: 'm/s',
    });
    shearModulus = new FormField({
        id: 'shearModulus',
        label: 'Kayma Modülü',
        minValue: 0,
        unit: 't/m<sup>2</sup>',
    });
    fineContent = new FormField({
        id: 'fineContent',
        label: 'İnce Dane Oranı',
        unit: '%',
        minValue: 0,
    });
    waterContent = new FormField({
        id: 'waterContent',
        label: 'Su Muhtevası',
        unit: '%',
        minValue: 0,
    });
    liquidLimit = new FormField({
        id: 'liquidLimit',
        label: 'Likit Limit',
        unit: '%',
        minValue: 0,
    });
    plasticLimit = new FormField({
        id: 'plasticLimit',
        label: 'Plastik Limit',
        unit: '%',
        minValue: 0,
    });
    plasticityIndex = new FormField({
        id: 'plasticityIndex',
        label: 'Plastisite İndisi',
        unit: '%',
        minValue: 0,
    });
    dampingRatio = new FormField({
        id: 'dampingRatio',
        label: 'Sönümleme Oranı',
        minValue: 0,
        maxValue: 1,
    });
    isCohesive = new FormField({
        id: 'isCohesive',
        label: 'Kohezyonlu Zemin',
    });
    extendSoilProfile = new FormField({
        id: 'extendSoilProfile',
        label: 'Zemin profilini efektif derinliğe kadar uzat',
    });
}

export class CorrelationForm extends BaseForm {
    selectedValue = new FormField({
        id: 'selectedValue',
        label: 'Kullanılacak Değer',
        choices: createMapList(['minimum', 'ortalama', 'maksimum']),
    });
}
