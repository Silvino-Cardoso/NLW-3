import React from 'react';

import '../styles/pages/OrphanagesMap.css'
import 'leaflet/dist/leaflet.css'

import mapMarkerimg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import {Map, TileLayer} from 'react-leaflet'

import {FiPlus} from 'react-icons/fi'

function OrphanagesMap(){
    return(
        <div id='page-map'>
            <aside>
                <header>
                    <img src={mapMarkerimg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão
                        esperando a sua visita :)
                    </p>
                </header>

                <footer>
                    <strong>Blumenau</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <Map
            center={[-26.9139822,-49.0716195]}
            zoom={15}
            style={{width: '100%', height: '100%'}}
            >          
                 <TileLayer
                    url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                /> 

                {/* <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?acess_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}>

                </TileLayer> */}
            </Map>


            <Link to='/' className='create-orphanage'>
            <FiPlus size={32} color='#fff'/>
            </Link>

        </div>
    )
}

export default OrphanagesMap