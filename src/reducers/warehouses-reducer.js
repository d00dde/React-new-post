const warehousesReducer = (state, action) => {
	if(state === undefined) {
		return {
			warehouses: [],
			loading: false,
			error: false,
			warehouse: {}
		}
	}
	switch(action.type) {
		case 'FETCH_WAREHOUSES_REQUEST':
			return {
	  		...state.warehouses,
	  		loading: true
	  	};
	  case 'FETCH_WAREHOUSES_SUCCESS':
	  	return {
	  		...state.warehouses,
	  		loading: false,
	  		warehouses: action.payload.data
	  	};
	  case 'FETCH_WAREHOUSES_FAILURE':
	  	return {
	  		...state.warehouses,
	  		loading: false,
	  		warehouses: [],
	  		error: action.payload
	  	}
	  	case 'WAREHOUSE_CHOOSED' :
	  		return{
				...state.warehouses,
				warehouse: action.payload
			}
		case 'CLEAR_WAREHOUSE':
			return {
				...state,
				warehouse: {}
			}

		default: return state.warehouses;
	}
}

export default warehousesReducer;