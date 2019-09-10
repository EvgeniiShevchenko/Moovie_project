import React from "react";
import { withRouter } from 'next/router';
import Items from "../components/body/item";
import Container from '@material-ui/core/Container';
import dynamic  from "next/dynamic";
import loadable from '@loadable/component';
// const DynamicComponent = dynamic(() => import('../components/body'));
// const TaskComponent = loadable(() => import('../components/body/item'));
import axios from "axios";
import Layout from "../components/Layout";



const Item = ({data}) => {
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

Item.getInitialProps = async (props) => {
    if(process.browser){
      console.log(`I'm working on the client${props.query.id}`);
      const response = await axios.get(`/api/moovie/${props.query.id}`);
      console.log(response.data);
      return {data: response.data, status: response.status}
    }else{
      console.log(`I'm working on the server${props.query.id}`);
      const response = await axios.get(`http://localhost:5000/api/moovie/${props.query.id}`);
      console.log(response.data);
      return {data: response.data, status: response.status}
    }
  };


export default withRouter(Item);
