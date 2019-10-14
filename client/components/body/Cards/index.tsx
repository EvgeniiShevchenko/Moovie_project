import React, { ReactNode, SetStateAction, Dispatch } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { usePagination } from 'react-pagination-hook';
import Grid from '@material-ui/core/Grid';
import root from 'window-or-global';
import _ from 'lodash';
// Import styles
// @ts-ignore
// dynamic(import('./cards.scss'), { ssr: false });
import './cards.scss';
import './preloader.scss';

// Import interfaces
import { ItemFace } from '../../../interfaces';
import { Usecontextdata } from '../../../interfaces';

//  Import context
import SearchContext from '../../../useContext/searchContext';

interface Props {
  data: Array<ItemFace>;
}

const Cards: React.FunctionComponent<Props> = ({ data }: Props): JSX.Element => {
  // useContext
  const {
    filterParametr,
    setFilterParameter,
    curentPage,
    setCurentPage,
    filterResetButtonHeandler,
    setFilterResetButtonHeandler,
  } = React.useContext<Usecontextdata>(SearchContext);
  // useState
  const [pageSize, setPageSize] = React.useState(6);
  const [initialData, setInitialData] = React.useState(data);
  const [initialPage, setInitialPage] = React.useState(1);
  const [numberOfPages, setNumberOfPages] = React.useState(10);
  const [maxButtons, setMaxButtons] = React.useState(10);
  const [mausAction, setMausAction] = React.useState({ status: false, id: '' });
  const [windowTrue, setWindowTrue] = React.useState(false);
  // Custom hook
  const { activePage, visiblePieces, goToPage } = usePagination({
    initialPage,
    numberOfPages,
    maxButtons,
  });

  // Use effect
  React.useEffect(() => {
    const array = [...initialData];
    setInitialData(array.splice(0, pageSize));
    setWindowTrue(true);
    // window.onload = function () {
    //   let elemnt = document.querySelector('#preloader');
    //   elemnt.parentNode.parentNode.removeChild(elemnt.parentNode);
    //   let element = document.querySelector('#loader');
    //   element.parentNode.removeChild(element.parentNode);
    // };
  }, []);

  React.useEffect(() => {
    goToPage(1);
    setCurentPage(1);
  }, [filterResetButtonHeandler]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/moovie/search/default', {
      method: 'POST',
      body: JSON.stringify(filterParametr),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        //   console.log(response);
        return response.json();
      })
      .then(data => {
        //   console.log(data);
        setInitialData(data);
      })
      .catch(error => console.error(error));
  }, [filterParametr]);

  React.useEffect(() => {
    if (initialPage > numberOfPages) {
      setInitialPage(numberOfPages);
    }
  }, [initialPage, numberOfPages]);

  React.useEffect(() => {
    const dataCount = data.length;
    const countPages = Math.ceil(dataCount / pageSize);
    // console.log(dataCount);
    // console.log(countPages);
    setNumberOfPages(50);
  }, [pageSize]);

  // React.useEffect(() => {
  //   if (maxButtons > numberOfPages) {
  //     setMaxButtons(numberOfPages);
  //   }
  // }, [maxButtons, numberOfPages]);

  const onClick = async (pageNumber: number) => {
    goToPage(pageNumber);
    setCurentPage(pageNumber);
    // console.log("До", filterParametr);
    setFilterParameter({ ...filterParametr, curentpage: pageNumber - 1 });
    // console.log("После", filterParametr);
  };

  const mouseEventTru = (id: string) => {
    setMausAction({ status: true, id });
    // console.log(mausAction);
  };
  const mouseEventFalse = (id: string) => {
    setMausAction({ status: false, id });
    // console.log(mausAction);
  };

  const ratingStar = (rating: number) => {
    // console.log(rating);
    const ratingArray = [];
    if (rating > 0) {
      for (let i = 0; i <= rating; i++) {
        ratingArray.push(i);
      }
    } else {
      for (let i = 0; i <= 10; i++) {
        ratingArray.push(i);
      }
    }
    const stars = _.map(ratingArray, (rateItem, index) => {
      return (
        <span style={{ display: 'flex', flexDirection: 'row' }}>
          {rating === 0 ? (
            <span style={{ display: 'flex', flexDirection: 'row' }}>
              <img style={{ width: '25px' }} src='/static/images/staroriginamptynew.png' alt='rating star' />
            </span>
          ) : (
            <span style={{ display: 'flex', flexDirection: 'row' }}>
              <img style={{ width: '25px' }} src='/static/images/starorigin.png' alt='rating star' />
            </span>
          )}
        </span>
      );
    });

    if (rating > 0) {
      const amptyStar = 10 - rating;
      for (let i = 0; i < amptyStar; i++) {
        stars.push(
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            <img style={{ width: '25px' }} src='/static/images/staroriginamptynew.png' alt='rating star' />
          </span>
        );
      }
    }

    return stars;
  };

  const cards = _.map(initialData, (item, index) => {
    return (
      <Grid item xs={4} key={index}>
        <div
          style={{ height: '400px', position: 'relative' }}
          onMouseOver={(): void => mouseEventTru(item._id)}
          onFocus={(): void => mouseEventTru(item._id)}
          onMouseLeave={(): void => mouseEventFalse(item._id)}
          onBlur={(): void => mouseEventTru(item._id)}
          key={index}
        >
          <img style={{ width: '100%', height: '100%' }} src={item.Images} alt={item.Name} />
          <div className='cardTitleName'>
            <Link as={`/title/${item.Slug}`} href={`/item?name=${item.Slug}`}>
              <a style={{ textDecoration: 'none' }}>
                <div style={{ cursor: 'pointer' }} className='card_title'>
                  {item.Name}
                </div>
              </a>
            </Link>
            <div
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '0 3px 3px 3px' }}
            >
              {ratingStar(item.Rating)}
            </div>
          </div>
          {mausAction.id === item._id && mausAction.status === true ? (
            <Link as={`/title/${item.Slug}`} href={`/item?name=${item.Slug}`}>
              <a>
                <div className='cardItemHoverEffect'>
                  <ul className='ulCardsStyle'>
                    <li>
                      <b>Выпуск: {item.Year}</b>
                    </li>
                    <li>
                      <b>Категория: {item.TypeOf}</b>
                    </li>
                    <li>
                      <b>Количество-серий: {item.NumOfSeries}</b>
                    </li>
                    <li>
                      <b>Возврастной рейтинг: {item.AgeRating}</b>
                    </li>
                    <li>
                      <b>
                        Жанры:{' '}
                        {_.map(item.Genre, (genre: Record<string, any>) => {
                          return (
                            <a
                              style={{
                                background: '#C03E2C',
                                margin: '0 3px 0 0',
                                borderRadius: '5px',
                                lineHeight: '140%',
                              }}
                            >{`${genre} `}</a>
                          );
                        })}
                      </b>
                    </li>
                    <li>
                      <b>Голосовали: {item.Voted}</b>
                    </li>
                    <li>
                      <b>Коментировали: {item.Commented}</b>
                    </li>
                    <li>
                      <b>Посмотрели: {item.Looked}</b>
                    </li>
                    <br />
                  </ul>
                </div>
              </a>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Grid>
    );
  });

  // root.window ? setWindowTrue(true) : setWindowTrue(false);

  if (root.window) {
    return (
      <>
        <div className='cardCardsWraper'>
          <Grid item container xs={9} spacing={2}>
            {cards}
          </Grid>
          <div className='cardContainerWraper'>
            <div className='cardButtonWraper'>
              {_.map(visiblePieces, (visiblePiece, index) => {
                const key = `${visiblePiece.type}-${index}`;

                if (visiblePiece.type === 'ellipsis') {
                  return <div key={key} style={{ height: '66px', width: '50px' }} />;
                }

                const { pageNumber } = visiblePiece;

                if (visiblePiece.type === 'page-number') {
                  const isActive = pageNumber === activePage;
                  const classButton = isActive ? { backgroundColor: '#C03E2C' } : { backgroundColor: '#DCB926' };
                  // console.log(index, pageNumber, visiblePiece.type);
                  return (
                    <button
                      type='button'
                      style={{ ...classButton }}
                      className='cardPaginationButton'
                      key={key}
                      onClick={(): void => {
                        onClick(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                const classArrow = visiblePiece.isDisabled
                  ? { backgroundColor: '#C03E2C' }
                  : { backgroundColor: '#DCB926' };
                return (
                  <button
                    type='button'
                    key={key}
                    style={{ borderStyle: 'none', cursor: 'pointer', ...classArrow }}
                    disabled={visiblePiece.isDisabled}
                    onClick={() => onClick(pageNumber)}
                  >
                    {visiblePiece.type === 'next' ? '>' : '<'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
    // } return <div id='preloader' className='cardCardsWraper'><div id='loader'></div></div>;
  }
  return <div className='cardCardsWraper' />;
};

export default Cards;
