import express from 'express';
import ItemsController from './controllers/ItemsControllers';
import SalesmanController from './controllers/SalesmanController';

const routes = express.Router();
const itemsController = new ItemsController();
const salesmanController = new SalesmanController();

routes.get('/items', itemsController.index );
routes.post('/salesman',salesmanController.create );
routes.get('/salesman/:id', salesmanController.show);
routes.get('/salesman', salesmanController.index);

export default routes;