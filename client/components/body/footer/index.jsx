import React from "react";
import styled from "styled-components";


const Footer = () => {
    return (
        <>
            <FooterWraper>
                <img src="static/images/Footer.png" />
            </FooterWraper>
        </>
    )
};

const FooterWraper = styled.div`
margin: 0 23px 15px 23px;
`;

export default Footer;