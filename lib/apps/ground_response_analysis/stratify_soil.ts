import { SoilLayerData } from 'types/soil_profile';
import { SoilProfile } from 'types/ground_response_analysis/input_types';

export const stratifySoilProfile = (soilProfile: SoilProfile): SoilProfile => {
    const newLayers = [];
    for (const layer of soilProfile.layers) {
        newLayers.push(...stratifyLayer(layer));
    }
    return {
        ...soilProfile,
        layers: newLayers,
    };
};

const calcThicknesses = (layer: SoilLayerData): number[] => {
    const shearWaveVelocity = layer.shearWaveVelocity as number;
    const thickness = layer.thickness as number;
    const maxThickness = shearWaveVelocity / 160;
    if (thickness <= maxThickness) return [thickness];

    const newThicknesses = [];

    let i = 1;
    while (i * maxThickness < thickness) {
        newThicknesses.push(maxThickness);
        i++;
    }

    if ((i - 1) * maxThickness - thickness < 0.000001) {
        newThicknesses.push(thickness - (i - 1) * maxThickness);
    }

    return newThicknesses;
};

const stratifyLayer = (layer: SoilLayerData): SoilLayerData[] => {
    const newLayers = [];
    const newThicknesses = calcThicknesses(layer);
    for (const thickness of newThicknesses) {
        newLayers.push({
            ...layer,
            thickness,
        });
    }

    return newLayers;
};
