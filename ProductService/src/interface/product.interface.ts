import { IMessageResponse } from './message.interface';

interface IProductService {
    /**
     * @returns all products from database or null if no products found
     */
    getAllProducts(): Promise<IProduct[] | null | IMessageResponse>;

    /**
     * @param id product id
     * @returns product from database or null if no product found
     */
    getProductById(id: number): Promise<IProduct | null>;

    /**
     * @param name product name
     * @returns product from database or null if no product found
     */
    getProductByName(name: string): Promise<IProduct | null>;

    /**
     * @param product product object
     * @returns product from database or null if no product found
     */
    addProduct(product: IProduct): Promise<IProduct | null | IMessageResponse>;

    /**
     * @param id product id
     * @returns product from database or null if no product found
     */
    deleteProduct(id: number): Promise<IProduct | null>;

    /**
     * @param product product object
     * @returns product from database or null if no product found
     */
    updateProduct(product: IProduct): Promise<IProduct | null>;
}

interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
}

export { IProductService, IProduct };
