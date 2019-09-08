import citiesReducer from './cities-reducer';
import warehousesReducer from './warehouses-reducer';

const reducer = (state, action) => {
	return {
		citiesInput: citiesReducer(state, action),
		warehouses: warehousesReducer(state, action)
	}
}

export default reducer;