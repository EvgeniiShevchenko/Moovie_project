import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { withRouter } from 'next/router';
import Items from '../../components/body/item';
import Container from '@material-ui/core/Container';
// const DynamicComponent = dynamic(() => import('../components/body'));
// const TaskComponent = loadable(() => import('../components/body/item'));
import axios from 'axios';
import Layout from '../../components/Layout';
import { WithRouterProps } from 'next/dist/client/with-router';


const Item = ({ data }: any) => {
  return (
    <>
      <Container>
        <Layout>
          <Items data={data}/>
          <br/>
        </Layout>
      </Container>
    </>
  );
};

Item.getInitialProps = async (props: any) => {
  console.log(props);
  const response = await axios.get(`http://localhost:5000/api/moovie/${props.query.pid}`);
  return { data: response.data, status: response.status };
};


export default withRouter(Item);
