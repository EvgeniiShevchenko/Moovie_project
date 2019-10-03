import { withRouter, Router } from 'next/router';
// import { NextFunctionComponent, NextContext } from "@types/next";
import { NextPage, NextPageContext, NextComponentType } from "next";
import React from 'react';
import Container from '@material-ui/core/Container';
import '../static/css/style.css';
import axios from 'axios';
import Layout from '../components/Layout';
import LayoutContext from '../components/LayoutContext';
import Carousel from '../components/body/corousel';
import News from '../components/body/news';
import Filter from '../components/body/filter';
import Cards from '../components/body/Cards';
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
  // console.log(data);
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
  const moovies = await axios.get(`http://localhost:5000/api/moovie`);
  const mooviesdata: ItemFace[] = moovies.data
  const genres = await axios.get(`http://localhost:5000/api/genre`);
  const genresdata: any[] = genres.data;
  return { data: mooviesdata, genres: genresdata, Component, router, ctx };
};

export default withRouter(Main);
