import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { ItemFace } from "../../../interfaces";

interface Props {
  data: ItemFace[];
};

const Item: FunctionComponent<Props> = ({ data }): JSX.Element => {

  if (typeof document !== 'undefined' && data.length !== 0) {
    return (
      <>
        <CardWraper>
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <article style={{ backgroundColor: '#DCB926' }}>
                <ImageWraper>
                  <span>
                    <input
                      style={{ maxHeight: '380px', maxWidth: '100%' }}
                      type='image'
                      src={data[0].Images}
                      alt={data[0].OriginalName}
                    />
                  </span>
                </ImageWraper>
                <ContentWraper>
                  <TitleWraper>
                    {data[0].Name}/{data[0].OriginalName}
                  </TitleWraper>
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
                </ContentWraper>
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
        </CardWraper>
      </>
    );
  }
  return <div>Loading...</div>;
};

const CardWraper = styled.div`
  // background-color: #DCB926;
  margin: 0 23px 0px 23px;
`;

const ImageWraper = styled.div`
  float: left;
  margin: 10px 10px 0 10px;
`;
const ContentWraper = styled.div`
  font-size: 18px;
  text-align: justify;
`;
const TitleWraper = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

export default Item;
