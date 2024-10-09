import { appDataSource } from '../config/typeorm';
import { IProduct, IProductService } from '../interface/product.interface';
import { ProductItem } from '../models/ProductItem.model';
import { CustomError } from '../../../GlobalAccess/utils/custom-error';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';

export class ProductService implements IProductService {
    /**
     *
     * @param product product object
     * @returns  product from database or null if no product found
     * @throws CustomError if product data is invalid
     */
    async addProduct(product: IProduct): Promise<IProduct | null> {
        const { name, description, price } = product;

        if (!name || !description || !price || price <= 0) {
            throw new CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid product data');
        }

        const data = await appDataSource
            .getRepository(ProductItem)
            .save(product)
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while adding product at addProduct',
                );
            });
        return data;
    }

    /**
     * @returns all products from database or null if no products found
     */
    async getAllProducts(): Promise<IProduct[] | null> {
        const data = await appDataSource
            .getRepository(ProductItem)
            .find()
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while fetching products at getAllProducts',
                );
            });
        if (!data) {
            return null;
        }

        return data;
    }

    /**
     *
     * @param id product id
     * @returns  product from database or null if no product found
     */
    async getProductById(id: number): Promise<IProduct | null> {
        const data = await appDataSource
            .getRepository(ProductItem)
            .findOne({
                where: {
                    id: id,
                },
            })
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while fetching product at getProductById',
                );
            });
        return data;
    }

    /**
     *
     * @param name product name
     * @returns  product from database or null if no product found
     */
    async getProductByName(name: string): Promise<IProduct | null> {
        const data = await appDataSource
            .getRepository(ProductItem)
            .findOne({
                where: {
                    name: name,
                },
            })
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while fetching product at getProductByName',
                );
            });
        return data;
    }

    /**
     *
     * @param id product id
     * @returns  product from database or null if no product found
     */
    async deleteProduct(id: number): Promise<IProduct | null> {
        const data = await appDataSource
            .getRepository(ProductItem)
            .findOne({
                where: {
                    id: id,
                },
            })
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while fetching product at deleteProduct',
                );
            });
        if (!data) {
            return null;
        }
        await appDataSource
            .getRepository(ProductItem)
            .delete(id)
            .catch((err) => {
                console.error(err);
                throw new CustomError(
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'Got issue while deleting product at deleteProduct',
                );
            });
        return data;
    }

    /**
     *
     * @param product product object
     * @returns  product from database or null if no product found
     */
    async updateProduct(product: IProduct): Promise<IProduct | null> {
        const data = await appDataSource.getRepository(ProductItem).findOne({
            where: {
                id: product.id,
            },
        });

        if (!data) {
            return null;
        }

        if (product.id !== undefined) {
            await appDataSource
                .getRepository(ProductItem)
                .update(product.id, product)
                .catch((err) => {
                    console.error(err);
                    throw new CustomError(
                        STATUS_CODE.INTERNAL_SERVER_ERROR,
                        'Got issue while updating product at updateProduct',
                    );
                });
        } else {
            throw new CustomError(STATUS_CODE.INTERNAL_SERVER_ERROR, 'Product ID is undefined');
        }
        return data;
    }
}
