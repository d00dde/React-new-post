import React from 'react';
import Header from '../header';
import CitiesInput from '../cities-input';
import Warehouses from '../warehouses';
import Map from '../map';
import Details from '../details';
import { connect } from 'react-redux';

import './app.css';
import { Button } from 'react-materialize';


import './app.css';

const App = (props) => {
  let center;
  if(!props.warehouse.SiteKey)
    center = false;
  else center = {
    lat: +props.warehouse.Latitude,
    lng: +props.warehouse.Longitude
  };
  return (
  	<div className='container row'>
      <Header />
      <div className="col s6 left-column">
        <CitiesInput />
        <Warehouses />
      </div>
      <div className="col s6 right-column">
        <Map center={center} />
        <Details warehouse = {props.warehouse}/>
      </div>
    </div>
	);
	
}

const mapStateToProps = (state) => {
  return {
    warehouse: state.warehouses.warehouse
  }
}

export default connect(mapStateToProps)(App);

