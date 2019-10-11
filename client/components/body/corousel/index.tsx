import Head from 'next/head';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import Slider from 'react-slick';
import root from 'window-or-global';


// Import interfaces
import { ItemFace } from "../../../interfaces";

// Import styles
import './corousel.scss';


const Corousel: FunctionComponent<{ data: ItemFace[] }> = ({ data }: { data: ItemFace[] }): JSX.Element => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const moovis_list = data.map((element: ItemFace, index?: number) => {
    return (
      <div key={index}>
        <Link href={{ pathname: '/item', query: { id: element._id, name: element.OriginalName } }}>
          <a>
            <img className='corousel_img' src={element.Images} alt={element.Name} />
          </a>
        </Link>
        <div>
          <p className='corousel-name-item ellipsis '>{element.Name}</p>
        </div>
      </div>
    );
  });

  if (root.window) {
    return (
      <>
        <Head>
          <link rel='stylesheet' href='' />
          <link
            rel='stylesheet'
            type='text/css'
            data-charset='UTF-8'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />
        </Head>
        <div className='corouselWraper'>
          <Slider {...settings}>
            {moovis_list}
            {/* <h1>Heloo error</h1> */}
          </Slider>
        </div>
      </>
    );
  }
  return <div className='corouselWraper'>...loading</div>;
};

export default Corousel;