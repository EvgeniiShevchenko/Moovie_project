import { withRouter, SingletonRouter, Router } from 'next/router';
import { NextPage, NextPageContext, NextComponentType } from "next";
import React from 'react';
import Container from '@material-ui/core/Container';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Items from '../components/body/item';
import Layout from '../components/Layout';
import { ItemFace } from "../interfaces";


interface Context extends NextPageContext {
  Component: NextComponentType;
  router: Router;
  ctx: NextPageContext;
}

interface Props {
  data: ItemFace[];
  Component: NextComponentType;
  router: Router;
  ctx: NextPageContext;
}


const Item: NextPage<Props> = ({ data = [] }) => {
  return (
    <>
      <Container>
        <Layout>
          <Items data={data} />
          <br />
        </Layout>
      </Container>
    </>
  );
};

Item.getInitialProps = async ({ Component, router, ctx, query }: Context) => {
  const response = await axios.get(`http://localhost:5000/api/moovie/${query.id}`);
  return { data: response.data, Component, router, ctx };
};

export default withRouter(Item);
