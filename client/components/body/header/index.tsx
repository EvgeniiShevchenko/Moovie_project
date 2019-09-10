import * as React from "react";
import SearchContext from "../../../useContext/searchContext";
import styled, {ThemeProvider} from 'styled-components';

export interface HeadProps {
    size?: boolean
};

const Head: React.FunctionComponent<HeadProps> = (props): JSX.Element => {
    // useContext
    // @ts-ignore
    const {filterParametr, setFilterParameter, searchValue, setSearchValue, curentPage, setCurentPage, filterResetButtonHeandler, setFilterResetButtonHeandler} = React.useContext(SearchContext);

    const searchButtonHeandler = () => {
        setFilterResetButtonHeandler(!filterResetButtonHeandler);
        setFilterParameter({...filterParametr, itemName: searchValue})
        // console.log("Hello")
    }

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center"}}>
                <img style = {props.size ? {width: "1155px"} : {}}  src="/static/images/header.png" alt="header"/>
                <King>
                    <input type="image" src="/static/images/king1.png" />
                </King>
                <Saitama>
                    <input type="image" src="/static/images/sitama.png" />
                </Saitama>
                <Search_string_input>
                    <input onClick = {searchButtonHeandler} type="image" src="/static/images/search_fild_input4.png" />
                    <Search_input_position>
                        <Search_input_wraper value = {searchValue} onChange = {(event) => setSearchValue(event.target.value)} type="text"/>
                    </Search_input_position>
                </Search_string_input>
                <Direction_buttom>
                    <input style = {{marginBottom: "-26px", zIndex: 3}} type="image" src="/static/images/films_button.png" />
                    <input style = {{marginBottom: "-26px", zIndex: 2}} type="image" src="/static/images/serials_button.png" />
                    <input type="image" src="/static/images/anime_button.png" />
                </Direction_buttom> 
                <Login_buttom>
                    <input type="image" src="/static/images/login_button.png" />
                </Login_buttom> 
                <Login_group>
                    <img className = "example"  src="/static/images/email_input.png" alt="email_input"/>
                    <img  src="/static/images/password_input.png" alt="password_input"/>
                    <Login_buttom_submit>
                        <input type="image" src="/static/images/submit_button.png" />
                    </Login_buttom_submit>
                </Login_group> 
            </div>
        </>
    )
}; 

export default Head;

const King = styled.div`
    position: absolute; 
    top: 95px;
    left: 30%;
`;

const Search_input_wraper = styled.input`
    @import url('https://fonts.googleapis.com/css?family=Cormorant+Infant&display=swap');
    font-family: 'Cormorant Infant', serif;
    font-style: italic;
    font-weight: bold;
    border: 0px;
    background: none;
    outline: none;
    outline-offset: 0;
    color: #6F0036;
    font-size: 20px;
    justify-content: space-between;
    width: 380px;
`;
const Search_input_position = styled.div`
    position: absolute;
    z-index: 3;
    left: 0%;
    top: 10px;
    opacity: 1;
    font-size: 22px;
`;

const Saitama = styled.div`
    position: absolute; 
    top: 85px;
    left: 58%;
`;

const Search_string_input = styled.div`
    top: 17px;
    left: 33%;
    position: absolute;
`;

const Direction_buttom = styled.div`
    display: flex;
    flex-direction: column;
    width: 172px;
    position: absolute;
    top: 8px;
    left: 6.8%;
`;

const Login_buttom = styled.div`
    position: absolute;
    z-index: 1;
    top: 40px;
    right: 11%;
`;

const Login_buttom_submit = styled.div`
display: flex;
justify-content: center;
width: "70px";
margin-top: 3px;
`;

const Login_group = styled.div`
    display: flex;
    flex-direction: column;
    justifyContent: center;
    position: absolute;
    width: 160px;
    top: 80px;
    right: 8.75%;
`;