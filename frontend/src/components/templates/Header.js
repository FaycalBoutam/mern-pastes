import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="header">
      <header className="container">
        <p className="logo">
          <Link to="/">
            <img src="/logo1.png" />
          </Link>
        </p>
      </header>
    </div>
  )
}

export default Header
