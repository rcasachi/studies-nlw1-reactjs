import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';
import { Fieldset, Input, ItemsList, Select } from '../../components';
import { getItems } from '../../services/items';
import { createPoint } from '../../services/points';
import { getIbgeStates, getIbgeCities } from '../../services/ibge';

const CreatePoint = () => {
  const [items, setItems] = useState([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedState, setSelectedState] = useState(''); 
  const [selectedCity, setSelectedCity] = useState(''); 
  const [selectedItems, setSelectedItems] = useState<number[]>([]); 
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([ latitude, longitude ]);
    });
  }, []);

  useEffect(() => {
    getItems.then(response => setItems(response.data));
  }, []);

  useEffect(() => {
    getIbgeStates.then(response => {
      const statesInitials = response.data.map((state) => state.sigla);
      setStates(statesInitials);
    });
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    getIbgeCities(selectedState).then(response => {
      const cityNames = response.data.map((city) => city.nome);
      setCities(cityNames);
    });
  }, [selectedState]);

  const handleSelectedState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);
  }

  const handleSelectedCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const handleMapClick = (event: LeafletMouseEvent ) => {
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng]);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >=0 ) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city: selectedCity,
      state: selectedState,
      items: selectedItems,
    };
    
    await createPoint(data);

    history.push('/');
  };

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br />ponto de coleta</h1>

        <Fieldset legend="Dados">
          <Input 
            label="Nome da Entidade"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
          />

          <div className="field-group">
            <Input 
              label="Email"
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
            <Input 
              label="WhatsApp"
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange}
            />
          </div>
        </Fieldset>

        <Fieldset legend="Endereço" sublegend="Selecione um endereço no mapa">
          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer 
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <Select 
              label="Estado"
              name="state"
              id="state"
              emptyValueLabel="Selecione um estado"
              onChange={handleSelectedState}
              value={selectedState}
            >
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </Select>
            <Select 
              label="Cidade"
              name="city"
              id="city"
              emptyValueLabel="Selecione uma cidade"
              onChange={handleSelectedCity}
              value={selectedCity}
            >
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </Select>
          </div>
        </Fieldset>

        <Fieldset legend="Itens de Coleta" sublegend="Selecione um ou mais itens abaixo">
          <ItemsList 
            data={items}
            onClick={handleSelectItem}
            selectedItems={selectedItems}
          />
        </Fieldset>

        <button type="submit">Cadastrar esse ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;