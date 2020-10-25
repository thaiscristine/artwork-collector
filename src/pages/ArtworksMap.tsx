import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMap, FiMapPin } from 'react-icons/fi';
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
  name: string;
}

function ArtworksMap(){

  const [users, setUsers] = useState<User[]>([]);
  const [artWorks, setArtWorks] = useState<Artwork[]>([]);

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
        name: 'testando',
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
          <strong>
              Ajuda
              <FiMapPin />
          </strong>
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
                {artwork.name}
                <Link to={`artworks/${artwork.id}`}>
                    <FiArrowRight size={20} color='#fff' />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      {/* <Link to="/artworks/create" className="create-artwork"> */}
      <Link to="create" className="create-artwork">
        <FiMap size={ 32 } color="#fff" />
      </Link>
    </div>
  );
}

export default ArtworksMap;