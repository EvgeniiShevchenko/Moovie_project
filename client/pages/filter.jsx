import React from "react";
import LayoutContext from "../components/LayoutContext";
import Page from "../components/body/filter/filter_page";
import styled from "styled-components";

const FilterPage = () => {
    return (
        <>
            <FilterBackDivWraper>
                <LayoutContext>
                    <FilterDivWraper>
                        <Page />
                    </FilterDivWraper>
                </LayoutContext>
            </FilterBackDivWraper>
        </>
    )
};

const FilterBackDivWraper = styled.div`
    max-width: 1366px;
    padding: 30px;
    background-color: white;
    border: 2px solid red;
`;
const FilterDivWraper = styled.div`
    width: 100%;
    height: 615px;
    background-color: rgba(128, 128, 128, 0.6);
    border-radius: 25px;
`;
export default FilterPage;