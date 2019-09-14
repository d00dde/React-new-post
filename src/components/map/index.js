import React, { Component } from 'react';
import GmapService from '../../services/gmap-service'
import './map.css';

import { connect } from 'react-redux';

class Map extends Component {

  componentDidMount () {
    this.gmap = new GmapService ();
  }

  componentDidUpdate () {
    this.gmap.setCenter(this.getCenter(this.props.warehouse));
  }

  render () {
    return (
      <div id='map'></div>
    )
  }

  getCenter (warehouse) {
    if(!warehouse.SiteKey)
      return false;
    return {
      lat: +warehouse.Latitude,
      lng: +warehouse.Longitude
    };
  }
}

const mapStateToProps = (state) => {
  return {
    warehouse: state.warehouses.warehouse
  }
}

export default connect(mapStateToProps)(Map);