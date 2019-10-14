import React, { useState, FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import root from 'window-or-global';

// Import styles
import './items.scss';

// Import interfaces
import { ItemFace } from '../../../interfaces';

interface Props {
  data: ItemFace[];
}

const Item: FunctionComponent<Props> = ({ data }): JSX.Element => {
  if (root.window) {
    return (
      <>
        <div className='itemCardWraper'>
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <article style={{ backgroundColor: '#DCB926' }}>
                <div className='itemImageWraper'>
                  <span>
                    <input
                      style={{ maxHeight: '380px', maxWidth: '100%' }}
                      type='image'
                      src={data[0].Images}
                      alt={data[0].OriginalName}
                    />
                  </span>
                </div>
                <div className='itemContentWraper'>
                  <h1 className='itemTitleWraper'>
                    {data[0].Name}/{data[0].OriginalName}
                  </h1>
                  <ul style={{ listStyleType: 'none' }}>
                    <li>Выпуск: {data[0].Year}</li>
                    <li>Производство: {data[0].Country}</li>
                    <li>Жанр: </li>
                    <li>Категория: {data[0].TypeOf}</li>
                    <li>Cерий: {data[0].NumOfSeries}</li>
                    <li>Озвучивание: </li>
                    <li>Cтудия: {data[0].Studio}</li>
                    <li>Возрастное ограничение: {data[0].AgeRating}</li>
                    <br />
                  </ul>
                  <div
                    style={{ margin: '0  13px 0 13px' }}
                    dangerouslySetInnerHTML={{ __html: `Описание: ${data[0].Description}` }}
                  />
                </div>
                <br />
                <div>
                  <img style={{ width: '100%' }} src='/static/images/Player.png' alt='Player-tamplates' />
                </div>
              </article>
            </Grid>
            <Grid item xs={3} style={{ padding: '23px 0 0 15px' }}>
              <div>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src='/static/images/filter-body.png'
                  alt='Filter-bacground'
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: '100%', width: '100%' }} />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
  return <div className='itemCardWraper'>Loading...</div>;
};

export default Item;
