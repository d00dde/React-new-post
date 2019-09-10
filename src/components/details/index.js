import React from'react';

import './details.css';

const Details = (props) => {
  if(!props.warehouse.SiteKey)
    return null
  const { Number,
    ShortAddressRu,
    Schedule,
    InternationalShipping,
    PlaceMaxWeightAllowed,
      } = props.warehouse;
  return (
    <div className='details'>
      <h5>Отделение № {Number}</h5>
      <div>Адресс: {ShortAddressRu}</div>
      <div className='row'>
        <div className='col l3'>График работы:</div>
        <ul className='col l9'>
          <li>ПН: {Schedule.Monday}</li>
          <li>ВТ: {Schedule.Tuesday}</li>
          <li>СР: {Schedule.Wednesday}</li>
          <li>ЧТ: {Schedule.Thursday}</li>
          <li>ПТ: {Schedule.Friday}</li>
          <li>СБ: {Schedule.Saturday}</li>
          <li>ВС: {Schedule.Sunday}</li>
        </ul>
      </div>
      <div>Международное отправление: {InternationalShipping === 1 ? 'да':'нет'}</div>
      <div>Максимальный вес отправления: {PlaceMaxWeightAllowed} кг.</div>
    </div>

  )
}

export default Details;
