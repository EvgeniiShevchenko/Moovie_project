import React from 'react';
import root from "window-or-global";

const Footer = () => {
  if (root.window) {
    return (
      <>
        <div className='footerWraper'>
          <img src='static/images/Footer.png' alt='Footer tamplates' />
        </div>
      </>
    )
  } return <div className='footerWraper'>...Loading</div>;
};

export default Footer;
