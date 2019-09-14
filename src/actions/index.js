import createFetch from './createFetch';

const fetchCities = createFetch('CITIES');
const fetchCity = createFetch('CITY');
const fetchWarehouses = createFetch('WAREHOUSES');

const warehouseChoosed = (warehouse) => {
	return {
		type:'WAREHOUSE_CHOOSED',
		payload: warehouse
	}
}

const clearWarehouse = () => {
	return {
		type:'CLEAR_WAREHOUSE'
	}
}

export {
	fetchCities,
	fetchCity,
	fetchWarehouses,
	warehouseChoosed,
	clearWarehouse
}

