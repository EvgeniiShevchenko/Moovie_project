import React from "react";
import SearchContext from "../useContext/searchContext";


const LayoutContext = ({children}) => {
    const [filterParametr, setFilterParameter] = React.useState({
        "curentpage": 0,
        "skip": 6,
        "limit": 6,
        "itemName": "",
        "filter": {
            "status": false,
            "Genre": "",
            "TypeOf": "",
            "Status": "",
            "Year": {
                "from": 0,
                "to": 0
            },
            "NumOfSeries": {
                "from": 0,
                "to": 0
            },
            "AgeRating": "",
        },
        "search": {
            "status": false,
            "type": "_id",
            "param": 1
        }
      });
      const [searchValue, setSearchValue] = React.useState("");
      const [curentPage, setCurentPage] = React.useState(1);
      const [filterResetButtonHeandler, setFilterResetButtonHeandler] = React.useState(false);

      const layoutContext = {
        filterParametr,
        setFilterParameter,
        curentPage,
        setCurentPage,
        searchValue,
        setSearchValue,
        filterResetButtonHeandler,
        setFilterResetButtonHeandler
      }

    // console.log("HAHAHAHA", children);
    return (
        <>
            <SearchContext.Provider value = {layoutContext}>
                {children}
            </SearchContext.Provider>
        </>
    )
};

export default LayoutContext;