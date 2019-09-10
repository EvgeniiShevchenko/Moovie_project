import React from "react";
import styled from "styled-components";


const News = () => {
    return (
        <>
            <NewsWraper>
                <img style = {{width: "100%"}} src="static/images/news.png" />
            </NewsWraper>
        </>
    )
};

const NewsWraper = styled.div`
    margin: 30px 0 0px 23px;
    width: 880px;
    height: 200px;
`;

export default News;