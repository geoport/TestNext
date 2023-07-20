import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@supabase/auth-helpers-react';
import { fetchBasket, Product, deleteProduct } from '@/lib/shopping';

const ShoppingList = () => {
    const user = useSession()?.user;
    const [basket, setBasket] = React.useState([] as Product[]);
    useEffect(() => {
        async function getProducts() {
            const products = await fetchBasket(user?.id as string);
            setBasket(products);
        }
        getProducts();
    }, [basket, user]);

    const totalPrice = basket.reduce((acc, item) => acc + item.price, 0);
    const onRemove = async (item: Product) => {
        await deleteProduct(item);
    };
    return (
        <div className="h-screen bg-gray-400">
            <div className="py-12">
                <div className="mx-auto max-w-5xl rounded-lg bg-gray-100 shadow-lg  md:max-w-5xl">
                    <div className="md:flex">
                        <div className="w-full p-4 px-5 py-5">
                            <div className="gap-2 md:grid md:grid-cols-3 ">
                                <div className="col-span-2 p-5">
                                    <h1 className="text-2xl font-medium ">
                                        Sepetim
                                    </h1>
                                    {basket.map((item, index) => (
                                        <CardItem
                                            key={index}
                                            product={item}
                                            onRemove={() => onRemove(item)}
                                        />
                                    ))}
                                    <div className="mt-6 flex items-center justify-between border-t pt-6">
                                        <div className="flex items-center">
                                            <i className="fa fa-arrow-left pr-2 text-sm"></i>
                                            <Link
                                                href="/price-list"
                                                className="text-md font-medium text-blue-600"
                                            >
                                                Alışverişe Devam Et
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="mr-8 text-2xl font-bold">
                                                Toplam:
                                            </span>
                                            <span className="text-2xl font-bold ">
                                                {totalPrice} ₺ + KDV
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;

const CardItem = (props: { product: Product; onRemove: Function }) => {
    const { product, onRemove } = props;

    return (
        <div className="mt-6 flex items-center justify-between pt-6">
            <div className="flex items-center">
                <Image
                    src={product.image}
                    width={60}
                    height={60}
                    alt={product.title}
                    className="rounded-full"
                />
                <div className="ml-3 flex flex-col">
                    <span className="md:text-md font-medium">
                        {product.title}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="pr-8 ">
                    <span className="text-xl font-medium text-slate-800">
                        {product.buyingOption == 'annula' ? 'Yıllık' : 'Aylık'}
                    </span>
                </div>
                <div className="pr-8 ">
                    <span className="text-xl font-medium text-slate-800">
                        {product.price} ₺
                    </span>
                </div>
                <div>
                    <button
                        className="text-lg font-extrabold"
                        onClick={() => onRemove()}
                    >
                        X
                    </button>
                </div>
                <div>
                    <i className="fa fa-close text-xs font-medium"></i>
                </div>
            </div>
        </div>
    );
};
