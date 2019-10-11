import { withRouter, useRouter, SingletonRouter, Router } from 'next/router';
import { NextPage, NextPageContext, NextComponentType } from "next";
import React from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';

// Import components
import Items from '../../../components/body/item';

// Import configurations
import { url } from "../../../config";

// Import wrapers
import Layout from '../../../components/Layout';

// Import intefaces
import { ItemFace } from "../../../interfaces";


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
  const router = useRouter();
  const { name } = router.query;

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
  console.log(Component, router, ctx, query);
  const response = await axios.get(`${url}api/moovie/${query.name}`);
  return { data: response.data, Component, router, ctx };
};

export default withRouter(Item);
