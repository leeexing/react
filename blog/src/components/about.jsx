import React from 'react'
import logo from '../logo.png';
import { Link } from 'react-router-dom'

class About extends React.Component {
  render() {
    return (
      <div className="m-about">
        <div className="about-wrap">
          <section>
            <div className="content-about">
              <header className="about-header">
                <img src={logo} className="about-logo" alt="logo" />
              </header>
              <p className="about-intro">
                Hey. I’m Dale-Anthony and I design simple, usable interfaces and websites.
              </p>
              <p className="info">
                I’m currently working for NUCTECH, and on my personal project, LEEEING.
              </p>
              <p className="contact">
                <Link to="/">
                  <i className="icon iconfont email"></i>
                  Email
                </Link>
                <Link to="/">
                  <i className="icon iconfont github"></i>
                  Git
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default About