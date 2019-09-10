import React from "react";
import Header from "./body/header";
import Footer from "../components/body/footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
};

export default Layout;