import { cities, warehouses, city } from './data';

export default class TestNewPostService {

	getCities = async () => {
		return new Promise ((resolve, reject) => {
			setTimeout(() => {
				resolve (cities);
			}, 500);
		});
	}
	
	getCity = async (name) => {
		return new Promise ((resolve, reject) => {
			setTimeout(() => {
				resolve (city);
			}, 500);
		});
	}


	getWarehouses = async () => {
		return new Promise ((resolve, reject) => {
			setTimeout(() => {
				resolve ({
					data: warehouses
				});
			}, 500);
		});
	}

}