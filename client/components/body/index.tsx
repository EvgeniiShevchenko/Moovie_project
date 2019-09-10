import * as React from "react";
// import {Route, Switch, BrowserRouter} from "react-router-dom";
import { Router } from "@reach/router";
// const { parse } = require('url');
import styled from "styled-components";
import Corousel from "./corousel";
// import loadable from '@loadable/component';
// const Corousel = loadable(() => import('./corousel'));

// const Head = React.lazy(() => import('./header'));
// const Corousel = React.lazy(() => import('./corousel'));

// Components
import { array, object, string } from "prop-types";
// import console = require("console");
// import console = require("console");
// import Head from "./header";
// import Item from "./item";

// interface Props {
//     children?: ReactNode
// };

export interface BodyProps {
  Corousel: JSX.Element;
}

function Body() {
  // console.log(children);

  const [data, dataState] = React.useState<any[]>([]);
  // console.log(data);

  // const chok: BodyProps = {
  //     data: data
  // };
  if (typeof window !== "undefined") {
    React.useEffect(() => {
      fetch("/api/moovie")
        .then(response => {
          console.log(response);
          return response.json()
        })
        .then(data => {
          console.log("TCL: data", JSON.stringify(data));
          dataState(data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  }

  // const Index = (():JSX.Element  => {
  //     return (
  //         <Corousel {...props} />
  //     )
  // })();

  // const Boom = () => {
  //     return (
  //         <Item id = {props.item_data} />
  //     )
  // };

  return (
    <div>
      {/* <Test name = "evgenii" /> */}
      {/* <Newcomponent data = {data} /> */}
      <Corousel data={data} />
      {/* <Suspense> */}
      {/* <Head /> */}
      {/* <Index path = "/" /> */}
      {/* <Router> */}
      {/* <Boom path = "item">
                        <Boom path = ":id/:name"/>
                    </Boom> */}
      {/* </Router>     */}
      {/* </Suspense> */}
    </div>
  );
}

export interface TestProps {
  name: string;
}

const Test = ({ name }: TestProps) => {
  return (
    <>
      <h1>Next component {name}</h1>
    </>
  );
};

export default Body;
