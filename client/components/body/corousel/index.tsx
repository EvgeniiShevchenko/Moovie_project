import * as React from "react";
import Slider from "react-slick";
import Head from 'next/head';
import styled from "styled-components";
import Link from 'next/link';


const Corousel = (props: {data: any[]}): JSX.Element => {
const {data} = props;
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const moovis_list = data.map((element?: any, index?: number) => {
        
        // const codename = (text: any) => {
        //     return  text.split(' ').join('-')
        // };

        return (
            <div key = {index}>
                <Link href = {{ pathname: '/item', query: {id: element._id, name: element.OriginalName}}} >    
                    <a>
                        <img style = {{width: "165px", height: "260px"}} src={element.Images} alt={element.Name}/>
                    </a>
                </Link>
            </div>
        )
    });

    if (typeof window !== 'undefined' || data.length !== 0){
        return (
            <>
                <Head>
                    <link rel="stylesheet" href=""/>
                    <link rel="stylesheet" type="text/css" data-charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                </Head>
                <Corousel_wraper>
                    <Slider {...settings}>
                        {moovis_list}
                        {/* <h1>Heloo error</h1> */}
                    </Slider>
                </Corousel_wraper>
            </>
        )
    }else{
        return (<div>udefined</div>)
    };
};

export default Corousel;

const Corousel_wraper = styled.div`
    margin: 15px 23px 0px 23px;
`;