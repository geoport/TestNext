import React from 'react';
import Image from 'next/image';
import Definition from '../components/layout/Definition';
import { useState } from 'react';

const AboutUs = () => {
    return (
        <>
            <Definition />
            <Section2 />
            <Section3 />
        </>
    );
};

type PersonProps = {
    name: string;
    title: string;
    job: string;
    image: string;
};
const Person = (props: PersonProps) => {
    const { name, title, job, image } = props;
    return (
        <div className="mb-12 w-1/2 px-5 lg:w-1/3">
            <div
                className="hover-up-5 wow animate__animated animate__fadeIn animated rounded border border-lime-500 bg-white px-4 pb-8 pt-8 text-center shadow hover:border-gray-200"
                data-wow-delay=".1s"
            >
                <div className="mx-auto mb-6 h-24 w-24 object-cover object-top">
                    <Image
                        className="rounded-full"
                        src={`/assets/imgs/team/${image}`}
                        alt={name}
                        width={96}
                        height={96}
                    />
                </div>
                <strong className="text-md mb-2 mt-6">
                    {title}
                    <br />
                    {name}
                </strong>
                <p className="mt-3 text-xs text-gray-600">{job}</p>
            </div>
        </div>
    );
};

const Section2 = () => {
    return (
        <section className="py-20">
            <div className="container pb-10 text-center">
                <div className="mx-auto mb-16 max-w-lg">
                    <span className="inline-block rounded-xl bg-lime-200 px-3 py-1 text-xs font-semibold text-soilprimeGreen">
                        {' '}
                        Uzman Ekibimiz
                    </span>
                    <h2 className="font-heading mb-4 mt-2 text-3xl font-bold text-gray-600 md:text-4xl">
                        Projenizi Uzmanlarımıza Emanet Edin
                    </h2>
                    <p className="text-blueGray-500 leading-loose">
                        Üçü akademisyen olmak üzere altı geoteknik mühendisinden
                        oluşan kadromuz ile sizlere en iyi ve en güvenilir
                        hizmeti sunmayı hedefliyoruz.
                    </p>
                </div>
                <div className="-mx-5 flex flex-wrap">
                    <Person
                        name="Altuğ SAYGILI"
                        title="Doç. Dr."
                        job="Pazarlama Uzmanı"
                        image="altug-saygili.jpeg"
                    />
                    <Person
                        name="Deniz ÜLGEN"
                        title="Prof. Dr."
                        job="Ar-Ge Uzmanı"
                        image="deniz-ulgen.jpg"
                    />
                    <Person
                        name="Mehmet Rifat KAHYAOĞLU"
                        title="Doç. Dr."
                        job="Pazarlama Uzmanı"
                        image="rifat-kahyaoglu.jpg"
                    />
                    <Person
                        name="Numan Burak FİDAN"
                        title="İnş. Yük. Müh."
                        job="Yazılım Takım Lideri"
                        image="burak-fidan.jpg"
                    />
                    <Person
                        name="Süleyman Arda GÜLER"
                        title="İnş. Müh."
                        job="Back-End Developer"
                        image="arda-guler.jpg"
                    />
                    <Person
                        name="Ali BAYRAM"
                        title="İnş. Müh."
                        job="Front-End Developer"
                        image="ali-bayram.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

const Section3 = () => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setData((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch('/api/send_mail', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert('Mesajınız başarıyla gönderildi!');
    };
    return (
        <section className="pb-10">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto mb-8 max-w-md">
                        <span
                            className="wow animate__animatedanimated animate__fadeIn inline-block rounded-xl bg-lime-200 px-3 py-1 text-xs font-semibold text-soilprimeGreen"
                            data-wow-delay=".1s"
                        >
                            İletişim
                        </span>
                        <h2
                            className="font-heading wow animate__animatedanimated animate__fadeIn mt-2 text-4xl font-bold text-gray-600"
                            data-wow-delay=".s"
                        >
                            Görüş ve önerilerinizi almaktan memnun oluruz!
                        </h2>
                    </div>
                    <div>
                        <form>
                            <div
                                className="wow animate__animatedanimated animate__fadeIn mb-4"
                                data-wow-delay=".3s"
                            >
                                <input
                                    className="bg-blueGray-50 w-full rounded p-4 text-xs font-semibold leading-none outline-none"
                                    type="text"
                                    placeholder="Konu"
                                    id="subject"
                                    value={data.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div
                                className="wow animate__animatedanimated animate__fadeIn mb-4"
                                data-wow-delay=".3s"
                            >
                                <input
                                    className="bg-blueGray-50 w-full rounded p-4 text-xs font-semibold leading-none outline-none"
                                    type="text"
                                    id="fullName"
                                    placeholder="Ad - Soyad"
                                    value={data.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div
                                className="wow animate__animatedanimated animate__fadeIn mb-4"
                                data-wow-delay=".3s"
                            >
                                <input
                                    className="bg-blueGray-50 w-full rounded p-4 text-xs font-semibold leading-none outline-none"
                                    type="email"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div
                                className="wow animate__animatedanimated animate__fadeIn mb-4"
                                data-wow-delay=".3s"
                            >
                                <textarea
                                    id="message"
                                    className="bg-blueGray-50 h-24 w-full resize-none rounded p-4 text-xs font-semibold leading-none outline-none"
                                    placeholder="Mesaj..."
                                    value={data.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div
                                className="wow animate__animatedanimated animate__fadeIn flex items-center justify-end"
                                data-wow-delay=".3s"
                            >
                                <button
                                    className="rounded-lg bg-lime-500 px-8 py-4 text-sm font-semibold leading-none text-white hover:bg-soilprimeGreen"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Gönder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AboutUs;
