import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { usePagination } from 'react-pagination-hook';
import styled from 'styled-components';
// import fetch from "unfetch";
import Grid from '@material-ui/core/Grid';
import SearchContext from '../../../useContext/searchContext';
import './cards.scss';

const Cards = ({data}) => {
    // useContext
    const {filterParametr, setFilterParameter, curentPage, setCurentPage, filterResetButtonHeandler,
        setFilterResetButtonHeandler} = React.useContext(SearchContext);
    // useState
    const [pageSize, setPageSize] = React.useState(6);
    const [initialData, setInitialData] = React.useState(data);
    const [initialPage, setInitialPage] = React.useState(1);
    const [numberOfPages, setNumberOfPages] = React.useState(10);
    const [maxButtons, setMaxButtons] = React.useState(10);
    const [mausAction, setMausAction] = React.useState({status: false, id: ""});
    // Custom hook
    const { activePage, visiblePieces, goToPage } = usePagination({
      initialPage,
      numberOfPages,
      maxButtons
    });

    // console.log("RETURN" , initialPage,  activePage);
    // console.log(initialData);

    React.useEffect(() => {
        const array = [...initialData];
        setInitialData(array.splice(0, pageSize));
     }, []);

    React.useEffect(() => {
        goToPage(1);
        setCurentPage(1);
     }, [filterResetButtonHeandler]);

    React.useEffect(() => {
        fetch("http://localhost:5000/api/moovie/search/default", {
            "method": "POST",
            "body": JSON.stringify(filterParametr),
            "headers": { "Content-Type": "application/json" }
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

    const onClick = async (pageNumber) => {
        goToPage(pageNumber);
        setCurentPage(pageNumber);
        // console.log("До", filterParametr);
        setFilterParameter({...filterParametr, curentpage: pageNumber -1});
        // console.log("После", filterParametr);
    };

    const mouseEventTru = (id) => {
        setMausAction({status: true, id: id});
        // console.log(mausAction);
    };
    const mouseEventFalse = (id) => {
        setMausAction({status: false, id: id});
        // console.log(mausAction);
    };

    const handler = (id, originalName) => {
        Router.push({
          pathname: `/item/${id}`,
        })
    };


    const ratingStar = (rating) => {
        // console.log(rating);
        let ratingArray = [];
        if(rating > 0) {
            for(let i = 0; i <= rating; i++){
                ratingArray.push(i);
            };
        }else{
            for(let i = 0; i <= 10; i++){
                ratingArray.push(i);
            };
        }
        const stars = ratingArray.map((map, index) => {
            return (
                <span style = {{display: "flex", flexDirection: "row"}}>
                   {rating === 0 ? <span style = {{display: "flex", flexDirection: "row"}}>
                <img style = {{width: "25px"}} src="/static/images/staroriginamptynew.png" alt="rating star"/>
             </span> : <span style = {{display: "flex", flexDirection: "row"}}>
                <img style = {{width: "25px"}} src="/static/images/starorigin.png" alt="rating star"/>
             </span>}
                </span>
            )
        });

        if(rating > 0){
            const amptyStar = 10 - rating;
            for(let i = 0; i < amptyStar; i++){
                stars.push(<span style = {{display: "flex", flexDirection: "row"}}>
                <img style = {{width: "25px"}} src="/static/images/staroriginamptynew.png" alt="rating star"/>
             </span>)
            };
        }

        return stars;
    };

    const cards = initialData.map((card, index) => {
        return (
            <Grid item xs={4} key = {index}>
                <div style={{ height: '400px', position: 'relative' }} onMouseOver={() => mouseEventTru(card._id)}
                     onMouseLeave={() => mouseEventFalse(card._id)} key={index}>
                {/* <div style = {{height: "400px", position: "relative"}} onMouseOver = {() => mouseEventTru(map._id)}  key = {index}> */}
                    <Link href={`/item/${card._id}`}>
                        <a>
                            <img style={{ width: '100%', height: '100%' }} src={card.Images} alt={card.Name}/>
                        </a>
                    </Link>
                    <div className = "hello">
                        <div style={{ cursor: 'pointer' }} onClick={() => handler(card._id, card.OriginalName)}
                             className="card_title">
                            {card.Name}
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            margin: '0 3px 3px 3px',
                        }}>{ratingStar(card.Rating)}</div>
                    </div>
                    {mausAction.id === card._id && mausAction.status === true && (
                      <div onClick={() => handler(card._id, card.OriginalName)} className="color">
                          <ul className="ulCardsStyle" type="none">
                              <li><b>Выпуск: {card.Year}</b></li>
                              <li><b>Категория: {card.TypeOf}</b></li>
                              <li><b>Количество-серий: {card.NumOfSeries}</b></li>
                              <li><b>Возврастной рейтинг: {card.AgeRating}</b></li>
                              <li><b>Жанры: {card.Genre.map((map, index) => {
                                  return (<a style={{
                                      background: '#C03E2C',
                                      margin: '0 3px 0 0',
                                      borderRadius: '5px',
                                      lineHeight: '140%',
                                  }}>{`${map} `}</a>);
                              })}</b></li>
                              <li><b>Голосовали: {card.Voted}</b></li>
                              <li><b>Коментировали: {card.Commented}</b></li>
                              <li><b>Посмотрели: {card.Looked}</b></li>
                              <br/>
                          </ul>
                      </div>
                    )}
                </div>
            </Grid>
        )
    });


    // console.log("Перезагрузка", filterParametr);
     return (
      <CardsWraper>
        <Grid item container xs={9} spacing={2}>
            {cards}
        </Grid>
      <ContainerWraper>
          <ButtonWraper>
        {visiblePieces.map((visiblePiece, index) => {
          const key = `${visiblePiece.type}-${index}`;

          if (visiblePiece.type === 'ellipsis') {
            return <div key={key} style={{height: "66px", width: "50px"}}></div>;
          }

          const { pageNumber } = visiblePiece;

          if (visiblePiece.type === 'page-number') {
            const isActive = pageNumber === activePage;
            const classButton = isActive ? {backgroundColor: "#C03E2C"} : {backgroundColor: "#DCB926"};
            // console.log(index, pageNumber, visiblePiece.type);
            return <PaginationButton style = {{ ...classButton}} key={key} onClick={() => {onClick(pageNumber)}} >{pageNumber}</PaginationButton>;
        }

            const classArrow = visiblePiece.isDisabled ? {backgroundColor: "#C03E2C"} : {backgroundColor: "#DCB926"};
          return <button key={key} style = {{borderStyle: "none", cursor: "pointer", ...classArrow}} disabled={visiblePiece.isDisabled} onClick={() => onClick(pageNumber)}>
            {visiblePiece.type === 'next' ? '>' : '<'}
          </button>;
        })}
        </ButtonWraper>
      </ContainerWraper>
      </CardsWraper>)
};

const PaginationButton = styled.button`
    height: 66px;
    width: 61px;
    border-style: none;
    cursor: pointer;
`;

const ContainerWraper = styled.div`
    margin: 15px 0 20px 0;
    max-width: 880px;
    max-height: 70px;
    display: flex;
    justify-content: center;
`;

const ButtonWraper = styled.div`
    display: flex;
    width: max-content;
    border: 2px solid #C03E2C;
    border-radius: 4px;
`;

const CardsWraper = styled.div`
    max-width: 1200px;
    margin: 10px 0 0 23px;
`;

export default Cards;




