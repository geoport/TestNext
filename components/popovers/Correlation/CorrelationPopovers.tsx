import { UndrainedShearStrength } from './UndrainedShearStrength';
import { FrictionAngle } from './FrictionAngle';
import { ElasticModulus } from './ElasticModulus';
import { PoissonsRatio } from './PoissonsRatio';
import { CompressionIndex } from './CompressionIndex';
import { RecompressionIndex } from './RecompressionIndex';
import { VolumeCompressibilityCoefficient } from './VolumeCompressibilityCoefficient';
import { ShearModulus } from './ShearModulus';
import { ShearWaveVelocity } from './ShearWaveVelocity';

export function CorrelationPopover(props: {
    onSubmit: (data: any) => void;
    id: string;
    soilClass: string;
}) {
    const { id, onSubmit, soilClass } = props;
    switch (id) {
        case 'undrainedShearStrength':
            return (
                <UndrainedShearStrength
                    onSubmit={onSubmit}
                    soilClass={soilClass}
                />
            );
        case 'frictionAngle':
            return <FrictionAngle onSubmit={onSubmit} soilClass={soilClass} />;
        case 'elasticModulus':
            return <ElasticModulus onSubmit={onSubmit} soilClass={soilClass} />;
        case 'poissonRatio':
            return <PoissonsRatio onSubmit={onSubmit} soilClass={soilClass} />;
        case 'compressionIndex':
            return (
                <CompressionIndex onSubmit={onSubmit} soilClass={soilClass} />
            );
        case 'recompressionIndex':
            return (
                <RecompressionIndex onSubmit={onSubmit} soilClass={soilClass} />
            );
        case 'volumeCompressibilityCoefficient':
            return (
                <VolumeCompressibilityCoefficient
                    onSubmit={onSubmit}
                    soilClass={soilClass}
                />
            );
        case 'shearModulus':
            return <ShearModulus onSubmit={onSubmit} soilClass={soilClass} />;

        case 'shearWaveVelocity':
            return <ShearWaveVelocity onSubmit={onSubmit} soilClass={soilClass} />;    

        default:
            return <div />;
    }
}
