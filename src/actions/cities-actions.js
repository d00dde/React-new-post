const fetchCitiesRequest = () => {
	return {
		type:'FETCH_CITIES_REQUEST'
	}
}

const fetchCitiesSuccess = (cities) => {
	return {
		type:'FETCH_CITIES_SUCCESS',
		payload: cities
	}
}

const fetchCitiesFailure = (error) => {
	return {
		type:'FETCH_CITIES_FAILURE',
		payload: error
	}
}


const fetchCities = (request, dispatch) => (name) => {
	dispatch(fetchCitiesRequest());
	request(name)
			.then((data) => {
					if(Array.isArray(data))
						dispatch(fetchCitiesSuccess(data));
					else{
						dispatch(fetchCitySuccess(data));

					}
			})
			.catch((error) => {
				dispatch(fetchCitiesFailure(error));
			});
}


const fetchCitySuccess = (city) => {
	return {
		type: 'FETCH_CITY_SUCCESS',
		payload: city
	}
}

export default fetchCities
