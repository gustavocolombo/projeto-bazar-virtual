import knex from '../database/connection';
import { Request, Response } from 'express';

class SalesmanController{ 
  async create (request: Request, response: Response){
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const sales= {
      image:'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=80',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('salesman').insert(sales);

    const sales_id = insertedIds[0];

    const saleItems = items.map((item_id: Number) => {
      return{
        item_id,
        sales_id
      }
    })

    await trx('sale_items').insert(saleItems);

    await trx.commit();

    return response.json({
      id: sales_id,
      ...sales
    })  
  }

  async show(request: Request , response: Response){ //listando um vendedor específico e os itens que ele vende
    const  id  = request.params.id;
    
    const salesman = await knex('salesman').where('id', id).first();

      if(!salesman){
        return response.status(400).json({ message : 'Vendedor não encontrado' });
      }
    
    const itemsForSale = await knex('items')
    .join('sale_items', 'items.id', '=', 'sale_items.item_id')
    .where('sale_items.sales_id', id)
    .select('items.title');

      return response.json({
        salesman,
        itemsForSale
      });
  }

  async index(request: Request, response: Response){
    const { uf, city , items} = request.query;

  const parsedItems = String(items).split(',').map(item=> Number(item.trim()));
  
  const salesman = await knex('salesman')
  .join('sale_items', 'salesman.id', '=', 'sale_items.sales_id')
  .whereIn('sale_items.item_id' , parsedItems)
  .where('city', String(city))
  .where('uf', String(uf))
  .distinct()
  .select('salesman.*')

    return response.json({
      salesman
    })

  }
}





export default SalesmanController;