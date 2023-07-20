import * as sp from '@/lib/supabase';
import AppData from 'data/price_data.json';

export interface Product {
    appName: string;
    title: string;
    price: number;
    buyingOption: string;
    image: string;
    id: string;
}

export async function add2Basket(
    appName: string,
    buyingOption: string,
    userId: string,
) {
    const data = {
        app_name: appName,
        buying_option: buyingOption,
        user_id: userId,
    };
    await sp.insertData(data, 'Basket');
}

export async function deleteProduct(product: Product) {
    await sp.deleteItem(product.id, 'Basket');
}

export async function fetchBasket(userId: string): Promise<Product[]> {
    const basket: Product[] = [];
    const products = (await sp.fetchDataByUser(userId, 'Basket')) as any[];

    products.forEach((product: any) => {
        const appName = product.app_name;
        const buyingOption = product.buying_option;
        const {
            image,
            title,
            price: prices,
        } = AppData[appName as keyof typeof AppData];
        let price;
        if (buyingOption === 'monthly') {
            price = prices.monthly;
        } else {
            price = prices.annual;
        }
        basket.push({
            appName: appName,
            buyingOption: product.buying_option,
            title: title,
            price: parseFloat(price),
            image: image,
            id: product.id,
        });
    });

    return basket;
}

export function checkBasket(basket: Product[], appName: string): boolean {
    return basket.some((product) => product.appName === appName);
}
