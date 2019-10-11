import { NextPage, NextPageContext, NextComponentType } from "next";
import { withRouter, SingletonRouter, Router } from 'next/router';
import React, { FunctionComponent } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

// Import configuration
import { url } from "../config";

// Import context
import LayoutContext from '../components/LayoutContext';

// Import interfaces
import { ItemFace } from "../interfaces";

// Import components
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
  const moovies = await axios.get(`${url}api/moovie`);
  const genres = await axios.get(`${url}api/genre`);
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
