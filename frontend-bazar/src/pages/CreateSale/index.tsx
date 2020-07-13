import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, Route } from 'react-router-dom';
import { Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Item {
  id : number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse{
  sigla: string;
}

interface IBGECityResponse{
  nome: string;
}

const CreateSale = () => {
  const history = useHistory ();
  const [items, setItems] = useState<Array<Item>>([]);
  const [uf, setUf] = useState<Array<string>>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]); //estado para o usuário setar a localização que ele clicar
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]); //estado da posição inicial do usuário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]); //array dos itens que o usuário irá selecionar, o tipo será número por que os id's são números

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  
  useEffect(() => {
    api.get('items').then(response => { 
      setItems(response.data);
    })
  }, []);

  useEffect(() =>{
    axios.get<Array<IBGEUFResponse>>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
    const ufInitials = response.data.map( uf => uf.sigla);  
    
    setUf(ufInitials);
    })
  }, []);

  useEffect(() =>{
    axios.get<Array<IBGECityResponse>>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityName = response.data.map( city => city.nome);

      setCities(cityName);
    })
  },[selectedUf]);

  useEffect(()=> { //useEffect usado para carregar a posição inicial do usuário quando ele carregar a aplicação
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, []);

  function handleSelectedUf(event: ChangeEvent <HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectedCity(event : ChangeEvent <HTMLSelectElement>){
    const city = event.target.value

    setSelectedCity(city);
  }

  function handleInputChange(event: ChangeEvent <HTMLInputElement>){
    const {name, value} = event.target; //sendo o name  o valor do input

    setFormData({...formData,[name]: value });
  }

  function handleClickMap(event: LeafletMouseEvent){
    setSelectedPosition([ //setando latitude e longitude
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleSelectedItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id);
      
      setSelectedItems(filteredItems);
    }else{
      setSelectedItems([...selectedItems, id]);
    }
    
  }
  
  function notify(){
    toast.success('Post de venda cadastrado!');
    history.push('/');
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    
    const { name, email, whatsapp} = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude]  =  selectedPosition;
    const items = selectedItems;

      const data = {
        name,
        email,
        whatsapp,
        uf,
        city,
        latitude,
        longitude,
        items
      }
      
     await api.post('salesman', data);
  
  }

  return (
    <div id = "estilo">
      <div className="page-create-sale">
        <Link to ="/">
          <header>
            <FiArrowLeft/>
            Voltar para a Home
          </header>
        </Link>

        <div id="image">
          <img src = {logo} alt = "logo do site"/>
        </div>    

          <form onSubmit = { handleSubmit }>
            <h1>Preencha a seguir suas informações pessoais,<br/>
             seguidamente dos itens que você deseja postar para venda</h1> 
            <fieldset>
              <legend>
                <h2>Dados do vendedor</h2>
              </legend>
                <div className="field">
                  <label htmlFor="name">Nome</label>
                    <input type="text" name = "name" placeholder = "Put your name" onChange={handleInputChange}/><br/>
                </div>
              
              <div className="field-group">
                <div className="field">
                  <label htmlFor="name">E-mail</label>
                    <input type="email" name = "email" placeholder = "Put your E-mail" onChange={handleInputChange}/><br/>
              </div>

              <div className="field">
                <label htmlFor="name">WhatsApp</label>
                  <input type="text" name = "whatsapp" placeholder = "Put your WhatsApp" onChange={handleInputChange}/><br/>
                </div>
              </div>
            </fieldset> 
            
          <Map center ={initialPosition} zoom ={15} onclick = {handleClickMap}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position= {selectedPosition}/>
          </Map>

            <div className="field">
              <fieldset>
                <legend>
                  <h2>Endereço</h2>
                    <span>Selecione um ponto no mapa</span>
                </legend>
              </fieldset>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Selecione uma UF (Unidade Federativa)</label>
                <select id="uf" value={selectedUf} onChange={ handleSelectedUf } name="uf">
                  <option value="0">UF</option>
                    {uf.map( uf => ( <option key={uf}> {uf} </option>))}
                </select>
              </div>

              <div className="field">
                <label htmlFor = "city">Selecione uma cidade da UF</label>
                <select id="city" value={selectedCity} onChange={handleSelectedCity}  name="city">
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key ={city} value={city}>{city}</option>
                  ))}
            </select>
              </div>
              </div>

                <fieldset>
                  <legend>
                    <h2>Itens para venda</h2>
                    <label htmlFor="items"> Selecione Itens para a venda</label>
                  </legend>
                  <ul className = "items-grid">
                   {items.map( item => 
                    (<li key = {item.id} 
                      onClick = {()=> handleSelectedItem(item.id)}
                      className = {selectedItems.includes(item.id) ? 'selected' : ''}
                      >
                      <img src = {item.image_url} alt = "descrição imagem"/>
                      {item.title}
                      </li>))}
                  </ul>
                  
                </fieldset>    
          
          
          <button type ="submit" onClick={notify}>
            Enviar
          </button>
 
          </form>
        </div>  
      </div>
  );
}

export default CreateSale;