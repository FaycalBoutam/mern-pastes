import React, { Fragment, useReducer, useEffect } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import "./App.css"

// components
import Header from "./components/templates/Header"
import Footer from "./components/templates/Footer"
// pages
import Home from "./components/Home"
import SignUp from "./components/auth/SignUp"
import SignIn from "./components/auth/SignIn"
import Account from "./components/pages/Account"
import UserPastes from "./components/pages/UserPastes"
import ViewSingle from "./components/pages/ViewSingle"
import TOS from "./components/pages/TOS"
import DMCA from "./components/pages/DMCA"
import PrivacyPolicy from "./components/pages/PrivacyPolicy"
import EditSingle from "./components/pages/EditSingle"
// context
import StateContext from "./components/context/State"
import DispatchContext from "./components/context/Dispatch"

Axios.defaults.baseURL = "http://localhost:5000"

function App() {
  const init = {
    loggedIn: Boolean(localStorage.getItem("wajba-paste-token")),
    user: {
      token: localStorage.getItem("wajba-paste-token"),
      name: localStorage.getItem("wajba-paste-name"),
      email: localStorage.getItem("wajba-paste-email"),
      id: localStorage.getItem("wajba-paste-userId"),
    },
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user.token = action.data.token
        draft.user.name = action.data.member.name
        draft.user.email = action.data.member.email
        draft.user.id = action.data.member._id
        return
      case "logout":
        draft.loggedIn = false
        draft.user.token = null
        draft.user.name = null
        draft.user.email = null
        draft.user.id = null
        return
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, init)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("wajba-paste-token", state.user.token)
      localStorage.setItem("wajba-paste-name", state.user.name)
      localStorage.setItem("wajba-paste-email", state.user.email)
      localStorage.setItem("wajba-paste-userId", state.user.id)
    } else {
      localStorage.removeItem("wajba-paste-token")
      localStorage.removeItem("wajba-paste-name")
      localStorage.removeItem("wajba-paste-email")
      localStorage.removeItem("wajba-paste-userId")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/signup">
                  <SignUp />
                </Route>
                <Route exact path="/signin">
                  <SignIn />
                </Route>
                <Route exact path="/account">
                  <Account />
                </Route>
                <Route exact path="/paste/my-pastes">
                  <UserPastes />
                </Route>
                <Route exact path="/paste/:shortUrl">
                  <ViewSingle />
                </Route>
                <Route exact path="/paste/edit/:shortUrl">
                  <EditSingle />
                </Route>
                <Route exact path="/dmca">
                  <DMCA />
                </Route>
                <Route exact path="/tos">
                  <TOS />
                </Route>
                <Route exact path="/privacy-policy">
                  <PrivacyPolicy />
                </Route>
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
