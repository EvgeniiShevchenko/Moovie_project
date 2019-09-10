import { withRouter } from "next/router";
import React, { useState, useEffect, Suspense } from "react";
import loadable from "@loadable/component";
import Container from "@material-ui/core/Container";
import styled, { ThemeProvider } from "styled-components";
import { height } from "@material-ui/system";
import "../static/css/style.css";
// import Body from "../components/body";
import Head from "../components/body/header";
// const TaskComponent = loadable(() => import('../components/body/task'))
import dynamic from "next/dynamic";
const Body = dynamic(() => import("../components/body"), { ssr: false });
import axios from "axios";
import Layout from "../components/Layout";
import LayoutContext from "../components/LayoutContext";
import Carousel from "../components/body/corousel";
import News from "../components/body/news";
import Filter from "../components/body/filter";
import Cards from "../components/body/Cards";

const Main = ({data, genres}) => {
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

Main.getInitialProps = async (props) => {
  try{
    if(process.browser) {
      const moovies = await axios.get(`/api/moovie`);
      const genres = await axios.get(`/api/genre`);
      return {data: moovies.data, genres: genres.data}
    }else{
      const moovies = await axios.get(`http://localhost:5000/api/moovie`);
      const genres = await axios.get(`http://localhost:5000/api/genre`);
      return {data: moovies.data, genres: genres.data}
    }
  }catch(error){
    console.error(error);
  }
};

export default withRouter(Main);
