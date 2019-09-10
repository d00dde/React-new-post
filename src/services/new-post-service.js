export default class NewPostService {

 APIKey = 'c0ce9a8981a02dab73883469619c32a1';
 urlBase = 'https://api.novaposhta.ua/v2.0/json/';

  getResource = async (params) => {
    const body = JSON.stringify({...params, apiKey: this.APIKey})

    const res = await fetch(this.urlBase,
    												 {
        											method: 'POST',
        											body:body,
        											headers:{
        												'content-type': 'application/json'
        											},

        			});

    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return await res.json();
  };

  getDistricts = async () => {
  	const districts = await this.getResource({
  		modelName: 'Address',
  		calledMethod: 'getAreas'
  	});
  	return districts.data
  }

  getCities = async () => {
  	const cities = await this.getResource({
  		modelName: 'Address',
  		calledMethod: 'getCities',
  	});

  	return cities.data.map((city) => city.Description);
  }

  getCity = async (name) => {
    const city = await this.getResource({
      modelName: 'AddressGeneral',
      calledMethod: 'getCities',
      methodProperties: {
        FindByString: name
      }
    });
    return city
  }

  getWarehouses = async (name) => {
    const warehouses = await this.getResource({
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        Language: "ru",
        CityName: name
      }
    });
    return warehouses
  }
}

