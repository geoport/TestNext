import React, { ReactNode } from 'react';
import Definition from '../components/layout/Definition';
import Image from 'next/image';

const Index = () => {
    return (
        <>
            <Definition />
            <Section1 />
            <Section2 />
            <Section3 />
        </>
    );
};

const Section1 = () => {
    return (
        <section className="pt-16 pb-20" id="key-features">
            <div className="container">
                <div className="mb-12 flex flex-wrap items-center justify-center">
                    <div className="mb-6 w-full lg:mb-0 lg:w-full">
                        <h2
                            className="font-heading wow animate__animated animate__fadeIn text-center text-3xl font-bold text-gray-600 lg:text-4xl"
                            data-wow-delay=".1s"
                        >
                            SoilPrime
                        </h2>
                    </div>
                    <div className="w-full py-4 lg:w-full">
                        <p
                            className="font-heading wow animate__animated animate__fadeIn text-center text-xl font-medium text-gray-500 lg:text-2xl"
                            data-wow-delay=".4s"
                        >
                            Bulut Tabanlı Geoteknik Yazılımları Platformu
                        </p>
                    </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:w-full lg:w-1/3">
                        <div
                            className="bg-blueGray-100 hover-up-2 wow animate__animated animate__fadeIn rounded border border-lime-500 px-6 pt-8 pb-12 text-center shadow transition duration-500 hover:shadow-lg"
                            data-wow-delay=".3s"
                        >
                            <div className="font-heading mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-2xl font-bold">
                                <Image
                                    src="/assets/imgs/icons/mobile.svg"
                                    alt="Online Erişim"
                                    width={24}
                                    height={32}
                                />
                            </div>
                            <h3 className="font-heading mb-2 py-6 font-bold">
                                Online Erişim
                            </h3>
                            <p className="text-blueGray-600 pb-6 text-sm">
                                Sadece üye girişi yaparak yazılımlar menüsünden
                                tüm yazılımlarımızı herhangi bir kurulum
                                yapmadan internet erişimi olan tüm
                                cihazlarınızda kolaylıkla kullanabilirsiniz.
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 w-full px-3 md:w-full lg:w-1/3">
                        <div
                            className="bg-blueGray-100 hover-up-2 wow animate__animated animate__fadeIn rounded border border-lime-500 px-6 pt-8 pb-12 text-center shadow transition duration-500 hover:shadow-lg"
                            data-wow-delay=".5s"
                        >
                            <div className="font-heading mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-2xl font-bold">
                                <Image
                                    src="/assets/imgs/icons/shopping.svg"
                                    alt="Satın Alma Kolaylığı"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h3 className="font-heading mb-2 py-6 font-bold">
                                Satın Alma Kolaylığı
                            </h3>
                            <p className="text-blueGray-600 pb-1 text-sm">
                                Arzu ettiğiniz yazılım paketlerimizi yıllık
                                olarak kredi veya banka kartınızla satın alıp
                                anında kullanmaya başlayabilirsiniz. Yapılan
                                güncellemelerden ek bir ücret ödemeden
                                faydalanabilirsiniz.
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 w-full px-3 md:w-full lg:w-1/3">
                        <div
                            className="bg-blueGray-100 hover-up-2 wow animate__animated animate__fadeIn rounded border border-lime-500 px-6 pt-8 pb-12 text-center shadow transition duration-500 hover:shadow-lg"
                            data-wow-delay=".5s"
                        >
                            <div className="font-heading mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-2xl font-bold">
                                <Image
                                    src="/assets/imgs/icons/pc.svg"
                                    alt="Kullanıcı Dostu Arayüz"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h3 className="font-heading mb-2 py-6 font-bold">
                                Kullanıcı Dostu Arayüz
                            </h3>
                            <p className="text-blueGray-600 pb-11 text-sm">
                                Tüm yazılımlarımız minimum bilgi alt yapısı
                                gerektirecek şekilde sade ve kullanımı kolay
                                arayüzlere sahiplerdir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Icon = ({ icon, alt }: { icon: string; alt: string }) => {
    return (
        <div className="px-4">
            <div className="font-heading mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-2xl font-bold">
                <div className="mx-auto mb-0 h-8 w-8 object-cover object-top">
                    <Image
                        src={`/assets/imgs/icons/${icon}.svg`}
                        alt={alt}
                        height={32}
                        width={32}
                    />
                </div>
            </div>
        </div>
    );
};
const Card = ({
    icon,
    children,
    title,
}: {
    icon: string;
    title: string;
    children: ReactNode;
}) => {
    return (
        <div
            className="wow animate__animated animate__fadeIn -mx-4 flex"
            data-wow-delay=".7s"
        >
            <Icon icon={icon} alt={title} />
            <div className="px-4">
                <h3 className="my-4 text-xl font-semibold">{title}</h3>
                <p className="text-blueGray-600 leading-loose">{children}</p>
            </div>
        </div>
    );
};
const Section2 = () => {
    return (
        <section className="bg-blueGray-100 py-20" id="why-choose-us">
            <div className="container">
                <div className="-mx-8 flex flex-wrap">
                    <div className="w-full px-8 lg:w-1/2">
                        <div className="mb-12 border-b pb-12 lg:mb-0 lg:border-b-0 lg:pb-0">
                            <h2
                                className="font-heading wow animate__animated animate__fadeIn mb-4 max-w-md text-3xl font-bold text-lime-600 lg:text-4xl"
                                data-wow-delay=".1s"
                            >
                                Neden Bizi Seçmelisiniz?
                            </h2>
                            <p
                                className="text-blueGray-600 wow animate__animated animate__fadeIn mb-8 leading-loose"
                                data-wow-delay=".3s"
                            >
                                Bizi diğer geoteknik yazılımlarından ayıran en
                                önemli özelliğimiz yazılımlarımızın kurulum
                                gerektirmeden online olarak kullanılabilmesidir.
                                Esnek ödeme planlarımız ile bütçenize uygun olan
                                planı seçerek saniyeler içerisinde
                                yazılımlarımızdan birini satın alıp kullanmaya
                                başlayabilirsiniz. Güçlü akademik kadromuz
                                sayesinde sizlere hem alt yapısı sağlam hem de
                                kullanımı kolay yazılımlar sunuyoruz.
                            </p>
                        </div>
                    </div>
                    <div className="w-full px-8 lg:w-1/2">
                        <ul className="space-y-12">
                            <li data-wow-delay=".3s">
                                <Card icon="headphone" title="Teknik Destek">
                                    Çalışma saatlerimiz boyunca satış, teknik
                                    destek ve geoteknik alanındaki sorularınız
                                    için bizlere ulaşabilirsiniz. Herhangi bir
                                    yazılımsal hata ile karşılaşmanız halinde
                                    teknik ekibimize gelen otomatik uyarılar
                                    sayesinde sorunlarınızı hızlı bir şekilde
                                    çözüp sizlere dönüş sağlamaktayız.
                                </Card>
                            </li>
                            <li data-wow-delay=".5s">
                                <Card
                                    icon="software"
                                    title="Yazılım Çeşitliliği"
                                >
                                    Yazılım çeşitliliğimizi gün geçtikçe
                                    arttırmaya özen gösteriyoruz. Satın
                                    alacağınız yazılımlarımızı birbirleriyle
                                    entegre olarak kullanarak projelerinizi daha
                                    verimli ve hızlı bir şekilde
                                    hazırlayabilirsiniz.
                                </Card>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-8 py-14 lg:w-1/2">
                        <Card icon="pc" title="Çoklu Cihaz Desteği">
                            Yazılımlarımızı kullanmanız için internet
                            bağlantısına sahip bir cihaza sahip olmanız
                            yeterlidir. Diğer birçok yazılımın aksine sizi tek
                            bir cihaza bağlı kılmayıp dilediğiniz yerden
                            yazılımlarımıza erişim sağlayabilmenize imkan
                            tanıyoruz.
                        </Card>
                    </div>
                    <div className="w-full px-8 py-14 lg:w-1/2">
                        <Card icon="file" title="Rapor Alma Seçeneği">
                            Alanında uzman akademisyenlerle, özel sektör ve
                            kamuda çalışan mühendislerle yaptığımız fikir
                            alış-verişleri sonucunda oluşturduğumuz rapor
                            taslaklarını yaptığınız analizlerin sonucunda
                            tarayıcınızda görüntüleyebilir ve Docx formatında
                            indirebilirsiniz.
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

function AppCard({ appTitle, imgName }: { appTitle: string; imgName: string }) {
    return (
        <div className="mb-12 w-1/2 px-5 lg:w-1/3">
            <div
                className="hover-up-5 wow animate__animated animate__fadeIn animated rounded border border-lime-500 bg-white px-4 pt-8 pb-8 text-center shadow hover:border-gray-200"
                data-wow-delay=".3s"
            >
                <div className="mx-auto mb-6 h-24 w-24 rounded-full object-cover object-top">
                    <Image
                        className="rounded-full"
                        src={`/assets/imgs/icons/${imgName}.jpg`}
                        alt={appTitle}
                        width={96}
                        height={96}
                    />
                </div>
                <strong className="text-md mt-6 mb-2">{appTitle}</strong>
                <p className="mt-3 text-xs text-gray-500"></p>
            </div>
        </div>
    );
}
const Section3 = () => {
    return (
        <section className="py-20" id="softwares">
            <div className="container mx-auto mt-20 mb-8 w-full max-w-6xl bg-transparent px-5 text-center">
                <div className="my-auto mx-auto mt-20 px-5 text-gray-600 shadow-xl">
                    <div className="mx-auto mb-16 max-w-lg">
                        <h2 className="font-heading mt-2 mb-4 text-3xl font-bold text-gray-600 md:text-4xl">
                            Yazılımlarımız
                        </h2>
                    </div>
                    <div className="mb-10 flex flex-wrap sm:justify-center">
                        <div className="wow animate__animated animate__fadeIn animated flex flex-wrap">
                            <AppCard
                                appTitle="Geoteknik Rapor Yazılımı"
                                imgName="geoteknik_rapor"
                            />
                            <AppCard
                                appTitle="Sahaya Özel Davranış Analizi"
                                imgName="deprem_kaydi_olceklendirme"
                            />
                            <AppCard
                                appTitle="Sismik Veri Analizi"
                                imgName="deprem_veri_analizi"
                            />
                            <AppCard
                                appTitle="Deprem Seçimi Yazılımı"
                                imgName="deprem_secimi"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Index;
