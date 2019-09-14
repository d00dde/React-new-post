export default (name) => (request, dispatch) => (...args) => {
	dispatch({type:`FETCH_${name}_REQUEST`});
	request(...args)
			.then((data) => {
						dispatch({type:`FETCH_${name}_SUCCESS`, payload: data});
			})
			.catch((error) => {
				dispatch({type:`FETCH_${name}_FAILURE`, payload: error});
			});
}