import { withRouter } from 'next/router';
import React from 'react';
import Container from '@material-ui/core/Container';
import '../static/css/style.css';
// import Body from "../components/body";
// const TaskComponent = loadable(() => import('../components/body/task'))
import dynamic from 'next/dynamic';
import axios from 'axios';
import Layout from '../components/Layout';
import LayoutContext from '../components/LayoutContext';
import Carousel from '../components/body/corousel';
import News from '../components/body/news';
import Filter from '../components/body/filter';
import Cards from '../components/body/Cards';

const Body = dynamic(() => import("../components/body"), { ssr: false });

const Main = ({data, genres}: any) => {
  // console.log(data);
  return (
    <>
      <Container>
        <LayoutContext>
          <Layout>
            <Carousel data = {data} />
            <div style = {{display: "flex", height: "240px"}}>
              <News />
              <Filter  genres = {genres} />
            </div>
            <Cards data = {data} />
          </Layout>
        </LayoutContext>
      </Container>
    </>
  );
};

Main.getInitialProps = async (props: any) => {
  const moovies = await axios.get(`http://localhost:5000/api/moovie`);
  const genres = await axios.get(`http://localhost:5000/api/genre`);
  return { data: moovies.data, genres: genres.data };
};

export default withRouter(Main);
