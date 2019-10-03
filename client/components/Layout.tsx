import React, { FunctionComponent, ReactNode } from 'react';
import Header from './body/header';
import Footer from './body/footer';

interface Props {
  children: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
