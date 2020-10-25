import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import { Link } from 'react-router-dom';
import { FiCheck, FiNavigation, FiCamera } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/artworks-map.css';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';

interface User {
  charge: string;
  _id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
}

interface Artwork {
  id: number;
  latitude: number;
  longitude: number;
  numero_do_registro: string;
  denominacao: string;
  descricao: string;
  titulo: string;
  governate: string;
  tecnica: string;
  materiais: string;
  local_de_producao: string;
  data_de_producao: string;
  diametro: string;
}

function ArtworksMap(){

  const history = useHistory();

  const [users, setUsers] = useState<User[]>([]);
  const [artWorks, setArtWorks] = useState<Artwork[]>([]);

  navigator.geolocation.getCurrentPosition((position) => {
    const  { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  });

  // function handleArCamera(){
  //   new Redirect('https://josefina-tech.umbler.net/');
  //   history.push('/ra.html');
  // };

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data); 
    });
    // api.get('art').then(response => {
    //   setArtWorks(response.data); 
    // });  

    setArtWorks([
      {
        id: 1,
        latitude: -23.6944,
        longitude: -46.5654,
        numero_do_registro:"182393",
        denominacao:"Moeda",
        descricao:"Anverso: Ao centro, as armas do Reino, cortando a legenda, entre 4.000 � esquerda, quatro flor�es � direita. Legenda:  PETRVS  . II . D . G . PORT . ET . ALG . REX . Reverso: Ao centro cruz de Cristo cantonada pela letra R. Legenda: * IN * HOC  * SIGNO * VINCES *. 1707. .",
        titulo:"4000 réis; Moeda",
        governate:"D. Pedro II (1683-1706)",
        tecnica:"cunhagem",
        materiais:"Ouro",
        local_de_producao:"Rio de Janeiro",
        data_de_producao:"1707",
        diametro:"30"
      },
      {
        id: 2,
        latitude: -23.6844,
        longitude: -46.5659,
        numero_do_registro:"182577",
        denominacao:"Moeda",
        descricao:"Anverso: Ao centro, as armas do Reino, cortando a legenda, com 4000, entre duas flores de lis, � esquerda, e quatro flor�es, tamb�m entre duas flores de lis, � direita. Legenda: IOANNES . V  . D G . PORT . ET . ALG . REX  . Reverso: ao centro, a cruz de Cristo, com ponto no meio, cantonada por quatro R. Legenda:  + IN + HOC + SIGNO + VINCES + x 1708 x  .",
        titulo:"4000 réis",
        governate:"D. João V (1706-1750)",
        tecnica:"cunhagem",
        materiais:"Ouro",
        local_de_producao:"Rio de Janeiro",
        data_de_producao:"1708",
        diametro:"30"
      },
      {
        id: 3,
        latitude: -23.6944,
        longitude: -46.5464,
        numero_do_registro:"182616",
        denominacao:"Moeda",
        descricao:"Anverso: Ao centro, a cabeça do rei, � direita, com cabeleira e coroa de louro, tendo, no exergo, a letra R. e o ano de 1736 e um ponto � direita. Legenda: IOANNES . V. D . PORT . ET . ALG . REX .  Reverso: As armas do Reino, ornamentadas, ocupando todo o campo.",
        titulo:"800 réis; Meio escudo",
        governate:"D. João V (1706-1750)",
        tecnica:"cunhagem",
        materiais:"Ouro",
        local_de_producao:"Rio de Janeiro",
        data_de_producao:"1736",
        diametro:"15.9",
      }
    ]);
  }, []);

  console.log(artWorks);

  return(
    <div id="page-map">
      <aside>
        <header>
          { users[0] &&
            <h2>Bem vindo(a) {users[0].name}!</h2>
          }
          <p>Mais que amante da cultura, um colecionador de artes</p>
        </header>
        <footer>
          <strong>Realidade aumentada</strong>
            {/* <Link to="ar" className="vr-artwork vr-artwork-desktop"> */}
            <a href="https://josefina-tech.umbler.net/" className="vr-artwork vr-artwork-desktop">
              <FiCamera size={ 32 } color="#fff" />
            </a>
        </footer>
      </aside>
      
      <Map 
        center={[-23.6898429, -46.5648481]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
        {artWorks.map(artwork => {
          return (
            <Marker 
              key={artwork.id}
              icon={mapIcon}
              position={[artwork.latitude, artwork.longitude]}>
              <Popup 
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
              >
                {artwork.titulo}
                <Link to={`artworks/${artwork.id}`}>
                  Coletar obra de arte
                    <FiCheck size={20} color='#fff' />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      {/* <Link to="/artworks/create" className="create-artwork"> */}
      <a href="https://josefina-tech.umbler.net/" className="vr-artwork vr-artwork-mobile">
        <FiCamera size={ 32 } color="#fff" />
      </a>

      <Link to="ar" className="create-artwork">
        <FiNavigation size={ 32 } color="#fff" />
      </Link>
    </div>
  );
}

export default ArtworksMap;