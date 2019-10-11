import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

// Import components
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
      <FooterWraper>
        <Footer />
      </FooterWraper>
    </>
  );
};

const FooterWraper = styled.div`
  max-width: 1200px;
  margin: 10px 0 0 23px;
`;

export default Layout;
