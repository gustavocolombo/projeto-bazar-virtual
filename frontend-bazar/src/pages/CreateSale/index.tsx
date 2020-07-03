import React from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const  CreateSale = () => {
  return (
    <div id = "estilo">
      <div className="page-create-sale">
        <Link to ="/">
          <header>
            <FiArrowLeft/>
            <strong>Voltar para a Home</strong>
          </header>
        </Link>
      
      <div id="descricao">
        <div className="descricao-pagina">
          <h2>Cadastro de Vendedores e Itens</h2>
        </div>
      </div>
      
      <div id="cadastro">
        <div className="formulario">
          <form>  
          
          </form>
        </div>  
      </div>
      
      </div>
    </div>
  );
}

export default CreateSale;