import React from 'react';
import withPagination from './pagination/with-pagination'
import './warehouses.css'

const Warehouses = ({ page, cityName, onClickItem }) => {

		const list = page.map(({ SiteKey, ShortAddressRu, Number }) => {
			return <a className="collection-item"
					  href='#'
					  key={SiteKey}
					  onClick={() => onClickItem(SiteKey)}
					>№{Number} {ShortAddressRu}</a>
		});
		return(
			<div className='warehouse-list'>
				<h4>{cityName}</h4>
				<div className="collection">
					{list}
				</div>
			</div>
		);
}

export default withPagination(Warehouses);
