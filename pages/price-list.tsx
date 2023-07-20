import React from 'react';
import * as tab from '../components/elements/Tab';
import priceData from 'data/price_data.json';
import { add2Basket, fetchBasket, Product } from '@/lib/shopping';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

const Pricing = () => {
    const user = useSession()?.user;
    const [basket, setBasket] = React.useState([] as Product[]);
    const onAdd2Basket = async (appName: string, buyingOption: string) => {
        await add2Basket(appName, buyingOption, user?.id as string);
    };

    useEffect(() => {
        async function getProducts() {
            const products = await fetchBasket(user?.id as string);
            setBasket(products);
        }
        getProducts();
    }, [basket, user]);
    return (
        <section
            className="bg-top bg-no-repeat pt-20 xl:bg-contain"
            style={{
                backgroundImage: "url('assets/imgs/backgrounds/intersect.svg')",
            }}
        >
            <div className="container">
                <div className="mb-16 text-center">
                    <h2
                        className="font-heading wow animate__animated animate__fadeIn mx-auto mb-4 max-w-2xl text-4xl font-bold text-gray-600"
                        data-wow-delay=".2s"
                    >
                        <span>
                            Saniyeler içerisinde yazılımlarımızdan birini satın
                            alıp kullanmaya başlayabilirsiniz
                        </span>
                    </h2>
                    <p
                        className="text-blueGray-400 wow animate__animated animate__fadeInDown mx-auto max-w-4xl text-lg"
                        data-wow-delay=".5s"
                    >
                        Arzu ettiğiniz yazılım paketlerimizi aylık / yıllık
                        olarak kredi veya banka kartınızla satın alıp anında
                        kullanmaya başlayabilirsiniz. Yapılan güncellemelerden
                        ek bir ücret ödemeden faydalanabilirsiniz.
                    </p>
                </div>
                <tab.TabWrapper>
                    <tab.TabBar>
                        <tab.TabLink title="Aylık" />
                        <tab.TabLink title="Yıllık" />
                    </tab.TabBar>
                    <tab.TabContentWrapper>
                        <tab.TabContent id="monthly">
                            <PricingTable
                                priceType={PriceType.monthly}
                                basket={basket}
                                onAdd2Basket={onAdd2Basket}
                            />
                        </tab.TabContent>
                        <tab.TabContent id="annual">
                            <PricingTable
                                priceType={PriceType.annual}
                                basket={basket}
                                onAdd2Basket={onAdd2Basket}
                            />
                        </tab.TabContent>
                    </tab.TabContentWrapper>
                </tab.TabWrapper>
            </div>
        </section>
    );
};

enum PriceType {
    monthly = 'monthly',
    annual = 'annual',
}
const PricingCard = (params: {
    appName: string;
    priceType: PriceType;
    basket: Product[];
    onAdd2Basket: (appName: string, buyingOption: string) => void;
}) => {
    const { appName, priceType, basket, onAdd2Basket } = params;
    const { title, price, features } =
        priceData[appName as keyof typeof priceData];
    const isAdded2Basket = basket.some(
        (product) => product.appName === appName,
    );
    return (
        <div className="mb-6 w-full px-3 md:w-1/2 lg:w-1/3">
            <div
                className="hover-up-5 wow animate__animated animate__fadeIn flex h-full flex-col justify-between rounded border-t-4 border-lime-500 bg-gray-50 px-4 pb-8 pt-16 text-center shadow"
                data-wow-delay=".2s"
            >
                <div>
                    <h3 className="font-heading mb-2 text-2xl font-bold">
                        {title}
                    </h3>
                    <span className="font-heading text-3xl font-bold text-lime-500">
                        {price[priceType]} ₺
                    </span>
                </div>
                <div className="mb-8 flex flex-col items-center">
                    <br />
                    <AppFeatures features={features} />
                </div>
                <div>
                    <a
                        className="mb-4 block rounded bg-lime-400 px-6 py-4 text-center text-xs font-semibold leading-none text-white hover:bg-soilprimeGreen sm:mb-0 sm:mr-3 sm:inline-block"
                        href={`/apps/${appName}`}
                    >
                        Demo Sürümü Dene
                    </a>
                    {isAdded2Basket ? (
                        <button
                            className="block rounded bg-blue-400 px-6 py-4 text-center text-xs font-semibold leading-none text-white hover:bg-soilprimeGreen sm:mb-0 sm:mr-3 sm:inline-block"
                            onClick={() => {}}
                        >
                            Sepette
                        </button>
                    ) : (
                        <button
                            className="text-blueGray-500 hover:text-blueGray-600 block rounded border border-lime-500 bg-white px-6 py-4 text-center text-xs font-semibold leading-none hover:border-soilprimeGreen hover:text-gray-600 sm:inline-block"
                            onClick={() => onAdd2Basket(appName, priceType)}
                        >
                            Sepete Ekle
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AppFeatures = ({ features }: { features: string[] }) => {
    return (
        <ul className="text-blueGray-400">
            {features.map((feature, index) => (
                <li className="mb-3 flex" key={index}>
                    <svg
                        className="mr-2 h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    );
};

const PricingTable = (params: {
    priceType: PriceType;
    basket: Product[];
    onAdd2Basket: (appName: string, buyingOption: string) => void;
}) => {
    const { priceType, basket, onAdd2Basket } = params;
    return (
        <div className="-mx-3 flex flex-wrap">
            <PricingCard
                appName={'georeport'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'seismic_analysis'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'earthquake_record_selection'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'ground_response_analysis'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'soil_correlations'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'packet1'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'packet2'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
            <PricingCard
                appName={'packet3'}
                priceType={priceType}
                basket={basket}
                onAdd2Basket={onAdd2Basket}
            />
        </div>
    );
};

export default Pricing;
