import React, { Component } from 'react';
import Spinner from '../spinner';
import List from './clear_list';

import './warehouses.css'


import { withNewPostService } from '../hoc'
import { connect } from 'react-redux';
import { compose } from '../../utils/';
import { fetchWarehouses, warehouseChoosed } from '../../actions';

class Warehouses extends Component {

	state = {
		cargoOnly : false
	}

	componentDidUpdate (prevProps) {
		if(!this.props.city.data)
			return;
		const prevCityName = prevProps.city.data ? prevProps.city.data[0].Description : '';
		const cityName = this.props.city.data[0].Description;
		if(prevCityName === cityName)
			return;
		this.props.fetchWarehouses(cityName);
		this.checkType(false);

	}

	render () {
		if(!this.props.city.data)
			return null;
		if(this.props.loading)
			return <Spinner />
		let warehouses = this.props.warehouses;
		if(this.state.cargoOnly)
			warehouses = this.props.warehouses.filter(({ PlaceMaxWeightAllowed }) => +PlaceMaxWeightAllowed > 900);
		return <List data={warehouses}
					 cityName={this.props.city.data[0].Description}
					 onClickItem={this.chooseWarehouse}
					 onCheckType={this.checkType}/>
	}

	chooseWarehouse = (SiteKey) => {
		const warehouse = this.props.warehouses.find((warehouse) => warehouse.SiteKey === SiteKey);
		this.props.warehouseChoosed(warehouse);
	}

	checkType = (flag) => {
		this.setState({cargoOnly : flag})
	}
}


const mapStateToProps = (state) => {
	return {
		warehouses: state.warehouses.warehouses,
		city: state.citiesInput.city,
		loading: state.warehouses.loading,
		warehouse: state.warehouses.warehouse,
	}
}

const mapActionsToProps = (dispatch, ownProps) => {
	return {
		fetchWarehouses: fetchWarehouses(ownProps.newPostService.getWarehouses, dispatch),
		warehouseChoosed:  (warehouse) => dispatch(warehouseChoosed(warehouse))
	}
}

export default compose(withNewPostService(),
						connect(mapStateToProps,mapActionsToProps)
					  )(Warehouses);
