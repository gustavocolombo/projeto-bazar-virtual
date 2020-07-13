import React from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';  
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

const Home = () => {
  return (
   <div id="global">
      <div id="page-home">
        <div className ="content">
          <div className="visual">
            
            <header>
              <img src = {logo} alt = "bazar-virtual home"/>
              <p id = "logo"> iBuy Online</p>
            </header> 
         
          </div>

        <h2>
          Somos uma plataforma com intuito<br/> de aproximar pessoas que possam<br/> oferecer
          itens que tenham alguma valia<br/> para um interessado e ainda gerar lucro<br/> por isso,
          somos a iBuy Online!
        </h2>

        <main>
          <Link to = "/create-sale">
            <span>
              <FiLogIn/>
            </span>
              <strong>Ir para o cadastro</strong>
          </Link>  
        </main>     
      </div>
    </div>
  </div>
  );
}

export default Home;  