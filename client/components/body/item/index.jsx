import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

const Item = (props) => {
    const [item, dataState] = useState(props.data);
    // console.log(props);
    // console.log("XAXAXAXAXAA props!!!", props);

    if (typeof document !== "udefined" && item.length !== 0){ 
        return (
        <>
            <CardWraper>
                <Grid container spacing={0}>
                    <Grid item xs={9}>
                        <article style = {{backgroundColor: "#DCB926"}}>
                            <ImageWraper>
                                <span>
                                    <a>
                                        <img style={{maxHeight: "380px", maxWidth: "100%"}} src={item[0].Images} alt={item[0].OriginalName} />
                                    </a>
                                </span>
                            </ImageWraper>
                            <ContentWraper>
                                <TitleWraper>{item[0].Name}/{item[0].OriginalName}</TitleWraper>
                                <ul type="none">
                                    <li>Выпуск: {item[0].Year}</li>
                                    <li>Производство: {item[0].Country}</li>
                                    <li>Жанр: </li>
                                    <li>Категория: {item[0].TypeOf}</li>
                                    <li>Cерий: {item[0].NumOfSeries}</li>
                                    <li>Озвучивание: </li>
                                    <li>Cтудия: {item[0].Studio}</li>
                                    <li>Возрастное ограничение: {item[0].AgeRating}</li>
                                    <br />
                                </ul>
                                <div style = {{margin: "0  13px 0 13px"}}
                                    dangerouslySetInnerHTML={{ __html: "Описание: " + item[0].Description }} />
                            </ContentWraper><br/>
                            <div>
                                <img style={{width: "100%"}} src="/static/images/Player.png" />
                            </div>
                        </article>  
                    </Grid>
                    <Grid item xs={3} style = {{ padding: "23px 0 0 15px"}}>
                        <div>
                            <img style={{width: "100%", height: "100%"}} src="/static/images/filter-body.png" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style = {{height: "100%", width: "100%"}}>
                        </div>
                    </Grid>
                </Grid>
            </CardWraper>
        </>
    )}else{
        return 'udefined'
    };
};

const CardWraper = styled.div`
    // background-color: #DCB926;
    margin: 0 23px 0px 23px;
`;

const ImageWraper = styled.div`
    float: left;
    margin: 10px 10px 0 10px;
`;
const ContentWraper = styled.div`
    font-size: 18px;
    text-align: justify;
`;
const TitleWraper = styled.h1`
    display: flex;
    justify-content: center;
    padding-top: 5px;
`;

export default Item;