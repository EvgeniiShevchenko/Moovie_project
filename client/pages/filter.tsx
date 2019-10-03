import React, { FunctionComponent } from 'react';
// import Page from "../components/body/filter/filter_page";
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { withRouter, SingletonRouter, Router } from 'next/router';
import { NextPage, NextPageContext, NextComponentType } from "next";
import axios from 'axios';
import LayoutContext from '../components/LayoutContext';
import { ItemFace } from "../interfaces";

const Page = dynamic(import('../components/body/filter/filter_page'), { ssr: false });

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

const FilterPage: NextPage<Props> = ({ data = [], genres = [] }) => {
  return (
    <>
      <FilterBackDivWraper>
        <LayoutContext>
          <FilterDivWraper>
            <Page data={data} genres={genres} />
          </FilterDivWraper>
        </LayoutContext>
      </FilterBackDivWraper>
    </>
  );
};

FilterPage.getInitialProps = async ({ Component, router, ctx }: Context) => {
  const moovies = await axios.get(`http://localhost:5000/api/moovie`);
  const genres = await axios.get(`http://localhost:5000/api/genre`);
  return { data: moovies.data, genres: genres.data, Component, router, ctx };
};

const FilterBackDivWraper = styled.div`
  background-image: url(/static/images/framefilterfon.png);
  max-width: 1366px;
  padding: 30px;
  background-color: white;
  border: 2px solid red;
`;
const FilterDivWraper = styled.div`
  width: 100%;
  height: 615px;
  background-color: rgba(128, 128, 128, 0.6);
  border-radius: 25px;
`;

export default withRouter(FilterPage);
