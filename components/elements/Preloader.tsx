import React from 'react';
import Image from 'next/image';

/**
 * Preloader component
 * @returns \{JSX.Element\} Preloader component
 */
const Preloader = () => {
    return (
        <div id="preloader-active">
            <div className="preloader flex-1 content-center">
                <div className="logo jump absolute">
                    <Image
                        src="/assets/imgs/loader.svg"
                        alt="Loading"
                        width={150}
                        height={150}
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
