import { Request, Response } from 'express';

interface IRequest extends Request {
    user?: any;
}
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { ProductService } from '../services/product.service';
import { CustomError } from '../../../GlobalAccess/utils/custom-error';

const addProductItemController = async (req: Request, res: Response) => {
    const productData = req.body;
    if (!productData) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Invalid product data' });
        return;
    }

    try {
        const productService = new ProductService();
        const product = await productService.addProduct(productData);

        if (!product) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Got issue while adding product' });
            return;
        }

        res.status(STATUS_CODE.CREATED).json(product);
    } catch (error) {
        const errorCatch = error as CustomError;
        res.status(errorCatch.status).json({ message: errorCatch.message });
    }
};

const getAllProductsController = async (req: IRequest, res: Response) => {
    try {
        const productService = new ProductService();
        const products = await productService.getAllProducts();

        if (!products) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Got issue while fetching products' });
            return;
        }

        res.status(STATUS_CODE.OK).json(products);
    } catch (error) {
        const errorCatch = error as CustomError;
        res.status(errorCatch.status).json({ message: errorCatch.message });
    }
};

export { addProductItemController, getAllProductsController };
