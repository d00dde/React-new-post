import React, { Component } from 'react';
import Spinner from '../spinner';
import Pagination from '../pagination'
import './warehouses.css'


import { withNewPostService } from '../hoc'
import { connect } from 'react-redux';
import { compose } from '../../utils/';
import { fetchWarehouses, warehouseChoosed } from '../../actions';

class Warehouses extends Component {

	state = {
		count: 10,
		activePage: 0
	}

	componentDidUpdate (prevProps) {
		if(!this.props.city.data)
			return;
		const prevCityName = prevProps.city.data ? prevProps.city.data[0].Description : '';
		const cityName = this.props.city.data[0].Description;
		if(prevCityName === cityName)
			return;
		this.props.fetchWarehouses(cityName);
		this.setState({activePage: 0});
	}

	render () {
		if(!this.props.city.data)
			return null;
		if(this.props.loading)
			return <Spinner />
			const page = this.getPage ( this.props.warehouses,
										this.state.count,
										this.state.activePage);
			const totalPages = Math.ceil(this.props.warehouses.length/this.state.count);
			const warehousesList = page.map(({ SiteKey, ShortAddressRu, Number }) => {
			return <a className="collection-item"
					  href='#'
					  key={SiteKey}
					  onClick={() => this.chooseWarehouse(SiteKey)}
					>№{Number} {ShortAddressRu}</a>
		});
		return(
			<div className='warehouse-list'>
				<h4>{this.props.city.data[0].DescriptionRu}</h4>
				<div className="collection">
					{warehousesList}
				</div>
				<Pagination totalPages ={totalPages}
							activePage={this.state.activePage}
							onPageChecked={this.onPageChecked}/>
			</div>
		);
	}

	chooseWarehouse = (SiteKey) => {
		const warehouse = this.props.warehouses.find((warehouse) => warehouse.SiteKey === SiteKey);
		this.props.warehouseChoosed(warehouse);
	}

	getPage = (warehouses, count, number) => {
		return warehouses.slice(count*number, count*(number+1));
	}

	onPageChecked = (number) => {
		let newPage;
		switch (number) {
			case '-1':
				newPage = this.state.activePage - 1;
				break;
			case '+1':
				newPage = this.state.activePage + 1;
				break;
			default:
				newPage = +number;
		}
		this.setState({
			activePage: newPage
		})
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
		fetchWarehouses: fetchWarehouses(ownProps.newPostService, dispatch),
		warehouseChoosed:  (warehouse) => dispatch(warehouseChoosed(warehouse))
	}
}

export default compose(
									withNewPostService(),
									connect(mapStateToProps,
													mapActionsToProps)
									)(Warehouses);
