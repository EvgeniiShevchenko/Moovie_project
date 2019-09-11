import React from 'react';
import { withRouter } from 'next/router';
import Items from '../components/body/item';
import Container from '@material-ui/core/Container';
// const DynamicComponent = dynamic(() => import('../components/body'));
// const TaskComponent = loadable(() => import('../components/body/item'));
import axios from 'axios';
import Layout from '../components/Layout';


const Item = ({ data }: any) => {
    console.log(data);
    return (
        <>
            <Container>
                <Layout>
                    <Items data = {data} />
                    <br/>
                </Layout>
            </Container>
        </>
    )
};

Item.getInitialProps = async (props: any) => {
  const response = await axios.get(`http://localhost:5000/api/moovie/${props.query.id}`);
  return { data: response.data, status: response.status };
};


export default withRouter(Item);
