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
              <div className="go-back">
                <Link to="/">
                  <i className="icon iconfont icon-reset"></i>
                </Link>
                <span>返回</span>
              </div>
              <header className="about-header">
                <img src={logo} className="about-logo" alt="logo" />
              </header>
              <p className="about-intro">
                Hey. I’m Leeing <br/> and I design simple, usable interfaces and websites.
              </p>
              <p className="info">
                I’m currently working for <a>NUCTECH</a>, and on my personal project, <a>LEEEING</a>.
              </p>
              <p className="contact">
                <Link to="/" className="email">
                  <i className="icon iconfont icon-email"></i>
                  Email
                </Link>
                <Link to="https://github.com/leeexing" className="way" target="_blank">
                  <i className="icon iconfont icon-git"></i>
                  Git
                </Link>
                <Link to="http://www.leeeing.com" className="way" target="_blank">
                  <i className="icon iconfont icon-blog"></i>
                  Blog
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