import React from "react";
import root from "window-or-global";

// Import styles
import "./news.scss";


const News = () => {
    if (root.window) {
        return (
            <>
                <div className='newsWraper'>
                    <img style={{ width: "100%" }} src="static/images/news.png" />
                </div>
            </>
        )
    } return <div className='newsWraper'>...Loading</div>;
};

export default News;