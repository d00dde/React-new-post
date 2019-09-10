import React, { Component } from 'react';
import GmapService from '../../services/gmap-service'
import './map.css';

class Map extends Component {

  componentDidMount () {
    this.gmap = new GmapService ();
  }

  render () {
    if(this.props.center)
      this.gmap.setCenter(this.props.center);
    return (
      <div id='map'></div>
    )
  }
}

export default Map;