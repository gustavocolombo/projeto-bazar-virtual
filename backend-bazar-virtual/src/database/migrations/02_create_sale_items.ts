import knex from 'knex';
import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('sale_items', table => {
    table.increments('id').notNullable();
    table.integer('sales_id').notNullable().references('id').inTable('salesman');
    table.integer('item_id').notNullable().references('id').inTable('items');
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('sale_items');
}