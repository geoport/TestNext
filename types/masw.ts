export interface MASWData {
    thickness?: number | string;
    shearWaveVelocity?: number | string;
    compressionalWaveVelocity?: number | string;
}

export interface MASW {
    thickness: number[];
    shearWaveVelocity: number[];
    compressionWaveVelocity?: number[];
}
