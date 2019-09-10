import React, { Component } from 'react';
import './cities-input.css'

import { withNewPostService } from '../hoc'
import { connect } from 'react-redux';
import { compose } from '../../utils/';
import { fetchCities, clearWarehouse } from '../../actions';
import { TextInput } from 'react-materialize';

class CitiesInput extends Component {

	state = {
		filter: [],
		value: ''
	}
	
	componentDidMount () {
		this.props.fetchCities();
	}
	
	render () {
		const searchHint = this.state.filter.map((item) => {
			return <li key={item}
								 onClick={(item) => this.cityChoosed(item)}
								 >{item}</li>
		})
		
		return(
			<div className='search-city'>
					<TextInput
						className='city-input'
						label='Выберите город'
						onChange={this.inputCityName}
						value ={this.state.value}
						onKeyPress={this.isSubmit}>
						<ul className='hint'>
							{searchHint}
						</ul>
					</TextInput>
			</div>
		)
	}
	
	inputCityName = (e) => {
		const search = e.target.value;
		const compare = search.toLowerCase().trim();
		const filter = [];
		const cities = this.props.cities;
		if(compare !== ''){
			for(let i = 0; i < cities.length; i++){
				if (cities[i].toLowerCase().startsWith(compare))
					filter.push(cities[i]);
				if (filter.length > 5){
					break;
				}
			}
			if(filter.length <= 5){
				for(let i = 0; i < cities.length; i++){
					if (cities[i].toLowerCase().match(compare))
						if(!filter.includes(cities[i]))
							filter.push(cities[i]);
					if (filter.length > 5)
						break;
				}
			}
		};
		this.setState({
			filter: filter,
			value: search
		});
	}

	isSubmit = (e) => {
		if(e.key !== 'Enter')
			return
		if(this.state.value === '')
			return
		if(!this.props.cities.includes(this.state.value))
			return
		this.cityChoosed(this.state.value);
	}

	cityChoosed = (city) => {
		let cityName;
		if(city.target)
			cityName = city.target.firstChild.data;
		else
			cityName = city;
		this.setState({
			filter: [],
			value: cityName
		});
		this.props.fetchCity(cityName);
		this.props.clearWarehouse();
	}


}


const mapStateToProps = (state) => {
	return {
		cities: state.citiesInput.cities,
		city: state.citiesInput.city
	}
}

const mapActionsToProps = (dispatch, ownProps) => {
	return {
		fetchCities: fetchCities(ownProps.newPostService.getCities, dispatch),
		fetchCity: fetchCities(ownProps.newPostService.getCity, dispatch),
		clearWarehouse: clearWarehouse
	}
}

export default compose(
									withNewPostService(),
									connect(mapStateToProps,
													mapActionsToProps)
									)(CitiesInput);



