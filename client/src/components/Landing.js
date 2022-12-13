import React from 'react';

export default function Landing() {
  return (
    <>
      {/* First div to contain intro for university */}
      <div className="container4">
        <div className="showcase">
        <img src={require("../static/landing.webp")} className="img_style" />
          <div className="centered">
            <h2>ADMIT - Experiential Learning</h2>
            <h4>The Real Meaning of ‘Working Knowledge’</h4>
            <h6>
              ADMIT is the world leader in experiential learning.
              Here, graduate students—from the master's through the doctorate,
              and in professional and certificate programs—put knowledge to work
              at Fortune 500 and startup companies, universities, government
              agencies, nonprofits, and global organizations.
            </h6>
          </div>
        </div>
      </div>

      {/* Second divto contain Research oinformation */}
      <div className="second-container1">
        <div className="research-container">
          <img src={require("../static/research.webp")} className="img_style" />
          <div className="right-aligned">
            <h2>Research</h2>
            <h4>Using Knowledge To Change the World</h4>
            <h6>
              As a tier-1 research university, ADMIT puts a premium on
              high-impact discovery—research that’s “use-inspired.” Students and
              faculty tackle challenges while working across disciplines, in
              fields from health and security to sustainability. And in our
              pioneering experiential PhD programs, students learn in
              environments relevant to their work, such as companies,
              laboratories, nonprofits, universities, and global organizations.
            </h6>
          </div>
        </div>
      </div>

      {/* Third div to contain global reach of university */}
      <div className="third-container1">
        <div className="world-container">
          <img src={require("../static/world.png")} className="img_style2" />
          <div className="left-aligned">
            <h2>Global Reach</h2>
            <h1>The World Is Our Campus</h1>
            <h6>
              With more than 3,300+ corporate partners in 90 countries, on every
              continent, ADMIT forges educational, experiential, and
              research partnerships. Our worldwide network of professionals and
              engaged university citizens includes more than 255,000 alumni.
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
