import { NextPage, NextPageContext, NextComponentType } from "next";
import { withRouter, Router } from 'next/router';
import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Container from '@material-ui/core/Container';

// Import components
import Carousel from '../components/body/corousel';
import News from '../components/body/news';
import Filter from '../components/body/filter';
import Cards from '../components/body/cards';

// Import configuration
import { url } from "../config";

// Import context
import LayoutContext from '../components/LayoutContext';

// Import interfaces
import { ItemFace } from "../interfaces";

interface Context extends NextPageContext {
  Component: NextComponentType;
  router: Router;
  ctx: NextPageContext;
}

interface Props {
  data: ItemFace[];
  genres: any[];
  Component: NextComponentType;
  router: Router;
  ctx: NextPageContext;
}

const Main: NextPage<Props> = ({ data = [], genres = [] }) => {
  return (
    <>
      <Container>
        <LayoutContext>
          <Layout>
            <Carousel data={data} />
            <div style={{ display: 'flex', height: '240px' }}>
              <News />
              <Filter genres={genres} />
            </div>
            <Cards data={data} />
          </Layout>
        </LayoutContext>
      </Container>
    </>
  );
};

Main.getInitialProps = async ({ Component, router, ctx }: Context) => {
  const moovies = await axios.get(`${url}api/moovie`);
  const mooviesdata: ItemFace[] = moovies.data
  const genres = await axios.get(`${url}api/genre`);
  const genresdata: any[] = genres.data;
  return { data: mooviesdata, genres: genresdata, Component, router, ctx };
};

export default withRouter(Main);
