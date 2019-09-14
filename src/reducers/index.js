import citiesReducer from './cities-reducer';
import warehousesReducer from './warehouses-reducer';

const reducer = (state, action) => {
	//console.log(action.type);
	return {
		citiesInput: citiesReducer(state, action),
		warehouses: warehousesReducer(state, action)
	}
}

export default reducer;