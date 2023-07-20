import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * A React component that represents the definition section of SoilPrime's website.
 * This component renders a section with a heading, a paragraph describing the company's mission,
 * and two buttons that link to different pages. The section also includes an image that is displayed to the right of the text. The component uses the Next.js Image component to optimize image loading.
 * @returns The rendered React component.
 */

export default function Definition() {
    return (
        <section className="relative -mt-10 pt-24">
            <div
                className="bg-blueGray-200 absolute inset-0 z-0 ml-auto hidden w-full lg:block"
                style={{ zIndex: '-1' }}
            ></div>
            <div className="container">
                <div className="-mx-3 flex flex-wrap items-center">
                    <div className="w-full px-3 lg:w-2/5">
                        <div className="py-12">
                            <div className="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                                <h2 className="font-heading wow animate__animated animate__fadeIn mb-4 text-3xl font-bold text-gray-600 lg:text-4xl">
                                    Ne Yapıyoruz?
                                </h2>
                                <p className="text-blueGray-400 wow animate__animated animate__fadeIn leading-relaxed">
                                    <strong>
                                        SoilPrime ekibi olarak uzman akademik
                                        kadromuzla geoteknik alanında ihtiyaç
                                        duyulan tüm yazılımları barındıran dünya
                                        çapında bir online platform oluşturmak
                                        için çalışıyoruz.
                                    </strong>
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <Link
                                    className="hover-up-2 wow animate__animated animate__fadeIn mb-4 block rounded bg-lime-500 py-4 px-8 text-center text-xs font-semibold leading-none tracking-wide text-white hover:bg-soilprimeGreen sm:mb-0 sm:mr-3 sm:inline-block"
                                    href="/price-list"
                                >
                                    Yazılımlarımız
                                </ Link>
                                <Link
                                    className="hover-up-2 wow animate__animated animate__fadeIn block rounded border border-lime-500 bg-white py-4 px-8 text-center text-xs font-semibold leading-none text-lime-500 hover:border-soilprimeGreen hover:text-soilprimeGreen sm:inline-block"
                                    data-wow-delay=".3s"
                                    href="#why-choose-us"
                                >
                                    Neden Bizi Seçmelisiniz?
                                </ Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5">
                        <div className="flex items-center justify-center">
                            <Image
                                src="/assets/imgs/iStock-7.jpg"
                                alt="SoilPrime"
                                width={715}
                                height={358}
                                priority={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
