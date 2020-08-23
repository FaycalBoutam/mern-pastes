import React, { useState, useContext } from "react"
import { Redirect } from "react-router-dom"
import Axios from "axios"
import StateContext from "../context/State"
import DispatchContext from "../context/Dispatch"
import Page from "../templates/Page"

function SignIn() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [errors, setErrors] = useState([])
  const [data, setdata] = useState({
    email: "",
    password: "",
  })

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post("/user/signin", data)
      if (res.data.token) {
        appDispatch({ type: "login", data: res.data })
      }
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  if (appState.loggedIn) {
    return <Redirect to="/" />
  }

  return (
    <Page title="Sign In">
      <h1>Login</h1>

      {errors.length
        ? errors.map(function (error, i) {
            return (
              <p className="message error" key={i}>
                {error.msg}
              </p>
            )
          })
        : ""}

      <form onSubmit={handleSubmit}>
        <p className="form-group">
          <input type="email" placeholder="Email" name="email" value={data.email} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group">
          <input type="password" placeholder="Password" name="password" value={data.password} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group form-submit">
          <button>Sign In</button>
        </p>
      </form>
    </Page>
  )
}

export default SignIn
