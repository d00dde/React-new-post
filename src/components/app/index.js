import React from 'react';
import './app.css';

import Header from '../header';
import CitiesInput from '../cities-input';
import Warehouses from '../warehouses';
import Map from '../map';
import Details from '../details';

//import { Button } from 'react-materialize';

export default () => {
  return (
  	<div className='container app row'>
      <Header />
      <div className="col m12 l6 left-column">
        <CitiesInput />
        <Warehouses />
      </div>
      <div className="col m12 l6 right-column">
        <Map />
        <Details />
      </div>
    </div>
  );
}