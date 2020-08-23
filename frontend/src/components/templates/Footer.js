import React, { useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../context/State"
import DispatchContext from "../context/Dispatch"

function Footer() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  function handleLogout(e) {
    e.preventDefault()

    if (window.confirm("Are you sure you want to log out?")) {
      appDispatch({ type: "logout" })
      window.location.replace("/")
    }
  }

  return (
    <footer>
      <div className="container">
        {appState.loggedIn ? (
          <div className="user-links">
            Logged in as{" "}
            <span className="tooltip-text">
              <Link to="#">
                {appState.user.name} <i className="arrow-up"></i>
              </Link>
              <div className="tooltip-content">
                <div className="tooltip-links">
                  <Link onClick={handleLogout} to="#">
                    Logout
                  </Link>
                  <Link to="/account">Account</Link>
                  <Link to="/paste/my-pastes">My pastes</Link>
                </div>
              </div>
            </span>
          </div>
        ) : (
          <div className="user-links">
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        )}
        <div className="pages">
          <Link to="/dmca">DMCA</Link>
          <Link to="/tos">TOS</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="copyright">© wajba-paste.com</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
