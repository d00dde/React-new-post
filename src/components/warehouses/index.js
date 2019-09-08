import React, { Component } from 'react';
import Spinner from '../spinner';


import { withNewPostService } from '../hoc'
import { connect } from 'react-redux';
import { compose } from '../../utils/';
import { fetchWarehouses } from '../../actions';


class Warehouses extends Component {

	componentDidUpdate (prevProps) {
		if(!this.props.city.data)
			return;
		const prevCityName = prevProps.city.data ? prevProps.city.data[0].Description : '';
		const cityName = this.props.city.data[0].Description;
		if(prevCityName === cityName)
			return;
		this.props.fetchWarehouses(cityName);
	}

	render () {
		if(!this.props.city.data)
			return <h2>Выберите город.</h2>;
		if(this.props.loading)
			return <Spinner />
		const { warehouses } = this.props;
		const warehousesList = warehouses.map(({ SiteKey, ShortAddressRu, Number }) => {
			return <li key={SiteKey}
								 onClick={() => this.chooseWarehouse(SiteKey)}
							>№{Number} {ShortAddressRu}</li>
		});
		return(
			<React.Fragment>
				<h2>{this.props.city.data[0].DescriptionRu}</h2>
				<ul>{warehousesList}</ul>
			</React.Fragment>
		);
	}

	chooseWarehouse = (SiteKey) => {
		console.log(SiteKey);
	}

}


const mapStateToProps = (state) => {
	return {
		warehouses: state.warehouses.warehouses,
		city: state.citiesInput.city
	}
}

const mapActionsToProps = (dispatch, ownProps) => {
	return {
		fetchWarehouses: fetchWarehouses(ownProps.newPostService, dispatch)
	}
}

export default compose(
									withNewPostService(),
									connect(mapStateToProps,
													mapActionsToProps)
									)(Warehouses);
