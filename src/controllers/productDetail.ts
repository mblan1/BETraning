import { con } from '../mysql/config';
import { Response, Request } from 'express';

const getProductByID = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let techInfoData = {};
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required', status: 400 });
        }

        const query = `
        select equipment_id, product_name, price, description, brand, model, manufacture_year, lead_time, location, transferState, 
            group_concat(productimages.link order by productimages.product_id) as imageLinks,
            productstate.state
        from productdetail
        inner join productimages on productdetail.id = productimages.product_id
        inner join productstate on productdetail.state_id = productstate.id
        where productdetail.id = ${id}
        group by productdetail.id;
        `;

        const techInfoQuery = `
        SELECT techinfo.widthFork, techinfo.widthUnit, techinfo.capacityValue, techinfo.capacityUnit from techinfo 
        inner join productdetail on techinfo.id = productdetail.id
        where product_id = ${id};  
        `;

        con.query(techInfoQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Got error while executing on database', status: 500 });
            }

            techInfoData = result[0];
        });

        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Got error while executing on database', status: 500 });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Product not found', status: 404 });
            }
            const { imageLinks, transferState } = result[0];
            const imageLinksArray = imageLinks.split(',');
            const newTransferState = transferState === 1 ? 'Sẵn Sàng' : 'Chưa Sẵn Sàng';

            return res.status(200).json({
                data: {
                    ...result[0],
                    imageLinks: imageLinksArray,
                    transferState: newTransferState,
                    techInfo: techInfoData,
                },
            });
        });
    } catch (error) {
        console.log(error);
    }
};

export { getProductByID };
