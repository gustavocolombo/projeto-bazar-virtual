# projeto-bazar-virtual
Este repositório vai ser destinado a um projeto que estou desenvolvendo, um bazar virtual. Por muitas vezes pessoas jogam no lixo pertences que ainda podem ser úteis a outras pessoas
ou que ainda funcionem, então estou desenvolvendo esse sistema (web e mobile) para que um "vendedor" possa postar neste sistema seu objeto e alguém possa comprar o mesmo.
O nome escolhido para o sistema foi **iBuy Online**, e será dividido em 3 partes, o back-end será construído em **NodeJS**, o front-end será construído com **ReactJS** e 
a aplicação mobile utilizará dos recursos da linguagem JSX ( Java Script + XML ) e será visto ao decorrer do desenvolvimento pelo Expo.
A ideia do sistema é simples, você como usuário desktop entra no iBuy Online, preenche seus dados pessoais, os itens pré-cadastrados no sistema, que você julga se encaixar na descrição,
e no app mobile o comprador poderá visualizar os vendedores que estão dispostos a venderem seus itens próximos dele, e também pesquisar por item de sua preferência. Fica mais 
descritivo nas imagens a seguir :
  Home do iBuy Online: 
    ![home_ibuyonline](https://user-images.githubusercontent.com/66711378/87347633-eab0ae80-c529-11ea-821e-f9b71e8910a3.png)
  
  Página de cadastro: Onde ele pode voltar para a Home e analisar a proposta de negócio ou fazer o seu cadastro pessoal e dos itens para venda
    
![Captura de tela de 2020-07-13 16-20-03](https://user-images.githubusercontent.com/66711378/87348810-b938e280-c52b-11ea-9669-aba740c23217.png)
![Captura de tela de 2020-07-13 16-20-19](https://user-images.githubusercontent.com/66711378/87348837-c786fe80-c52b-11ea-9859-afc73571e222.png)
  Quando nenhum item ainda está selecionado, ele ficará com a cor amarela, com o significado de que não está pronto ainda, ou não foi selecionado, caso o usuário clique em algum 
  dos itens, ele ficará verde, assim como se ele clicar no botão de submissão do formulário:
    ![Captura de tela de 2020-07-13 16-20-30](https://user-images.githubusercontent.com/66711378/87348858-cf46a300-c52b-11ea-91d6-a1f37384a943.png)
    
  E após a submissão do formulário, ele será redirecionado pra página inicial através da função useHistory e será exibido uma notificação em sua tela que o Post da venda foi criado, no estilo tostify
  ![Captura de tela de 2020-07-13 16-18-20](https://user-images.githubusercontent.com/66711378/87347590-da003880-c529-11ea-9892-740cf191dc18.png)
