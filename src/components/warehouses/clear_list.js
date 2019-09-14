import React from 'react';
import { withPagination } from '../hoc';
import { Checkbox } from 'react-materialize';
import './warehouses.css'

const List = ({ data, cityName, onClickItem, onCheckType }) => {

		let list = data.map(({ SiteKey, ShortAddressRu, Number }) => {
			return <a className="collection-item"
					  key={SiteKey}
					  onClick={() => onClickItem(SiteKey)}
					>№{Number} {ShortAddressRu}</a>
		});
		if(data.length === 0) 
			list = <h3>Ничего не найдено.</h3>
		return(
			<div className='warehouse-list'>
				<div className='row'>
					<div className ='city-name'>{cityName}</div>
					<Checkbox value="Red" 
						  label="Только грузовые"
						  onChange={(e) => onCheckType(e.target.checked)} />
				</div>

				<div className="collection">
					{list}
				</div>
			</div>
		);
}

export default withPagination(List);
