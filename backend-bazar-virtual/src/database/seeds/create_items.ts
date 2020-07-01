import knex from 'knex';
import Knex from 'knex';

export async function seed(knex : Knex){
  await knex('items').insert([
    { title : 'Decoração diversa', image: 'lampadas.svg'},
    { title : 'Roupas', image: 'roupas.svg'},
    { title : 'Móveis', image: 'moveis.svg'},
    { title : 'Colecionáveis', image: 'colecionaveis.svg'},
    { title : 'Livros', image: 'livros.svg'},
    { title : 'Eletrônicos', image: 'eletronicos.svg'},
  ]);
}