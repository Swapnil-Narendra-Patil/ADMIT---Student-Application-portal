import React from 'react';

export default function Footer() {
  return (
    <>
        <footer className='container-footer'>
          <div className='footer-main'>
            <h4> ADMIT </h4>
          <div className='myDivElement'>
          <ul>
               <li><a href="/dashboard">Home</a></li>
               <li><a href="/">About Us</a></li>
          
          </ul>
          </div>
          <div className='copyright'>
              <p>©2022 ADMIT | 390 Huntington Avenue, Boston, MA </p>
          </div>
          </div>
        </footer>
    </>
  );
}