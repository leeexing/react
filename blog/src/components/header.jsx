import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <nav className="m-header">
        <div className="left-side">
          <div className="logo">Leeing</div>
        </div>
        <div className="login">
          <Link to="/login">Login</Link>
        </div>
      </nav>
    )
  }
}
export default Header