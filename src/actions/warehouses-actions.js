const fetchWarehousesRequest = () => {
	return {
		type:'FETCH_WAREHOUSES_REQUEST'
	}
}

const fetchWarehousesSuccess = (warehouses) => {
	return {
		type:'FETCH_WAREHOUSES_SUCCESS',
		payload: warehouses
	}
}

const fetchWarehousesFailure = (error) => {
	return {
		type:'FETCH_WAREHOUSES_FAILURE',
		payload: error
	}
}

const fetchWarehouses = (newPostService, dispatch) => (cityName) => {
	dispatch(fetchWarehousesRequest());
	newPostService.getWarehouses(cityName)
			.then((data) => {
						dispatch(fetchWarehousesSuccess(data));
			})
			.catch((error) => {
				dispatch(fetchWarehousesFailure(error));
			});
}

export default fetchWarehouses