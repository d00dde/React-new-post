
const citiesReducer = (state, action) => {
	if(state === undefined) {
		return {
			cities: [],
			loading: false,
			error: false,
			city: {}
		}
	}
	switch(action.type) {
		case 'FETCH_CITIES_REQUEST':
	  	return {
	  		...state.citiesInput,
	  		loading: true
	  	};
	  case 'FETCH_CITIES_SUCCESS':
	  	return {
	  		...state.citiesInput,
	  		loading: false,
	  		cities: action.payload
	  	};
	  case 'FETCH_CITIES_FAILURE':
	  	return {
	  		...state.citiesInput,
	  		loading: false,
	  		cities: [],
	  		error: action.payload
	  	}
	  case 'FETCH_CITY_SUCCESS':
	  	return{
	  		...state.citiesInput,
	  		city: action.payload
	  	}
		default: return state.citiesInput;
	}
}

export default citiesReducer;