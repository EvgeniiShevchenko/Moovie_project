import App from 'next/app';
import React from 'react';


import styled, { ThemeProvider } from 'styled-components';
import Head from "../components/body/header/";


const theme = {
  colors: {
    primary: '#0070f3'
  }
};

export default class MyApp extends App {
  render () {
    const { Component, pageProps, children } = this.props
    return (
        <ThemeProvider theme={theme}>
                <Container_wraper>
                    {/* <Head /> */}
                    <Component {...pageProps} />
                </Container_wraper>
        </ThemeProvider>
    )
  }
}

const Container_wraper = styled.div`
    background: url('/static/images/83fr9J.jpg') no-repeat center center fixed;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;