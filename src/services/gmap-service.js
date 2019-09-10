export default class GmapService {

  _map = null;
  _marker = null;

  constructor () {
    this._map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: {
        lat: 50.354786000000000,
        lng: 30.542884000000000,
      }
    });

  }

  setCenter = (center) => {
    this._map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: center
    });
    if(this._marker)
      this._marker.setMap(null);
    this._marker = new window.google.maps.Marker({
      position: center,
      map: this._map,
    });
  }
}