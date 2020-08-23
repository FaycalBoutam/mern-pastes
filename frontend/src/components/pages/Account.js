import React, { useState, useContext } from "react"
import Axios from "axios"
import StateContext from "../context/State"
import { Redirect } from "react-router-dom"
import Page from "../templates/Page"

function Account() {
  const appState = useContext(StateContext)
  const [success, setSuccess] = useState("")
  const [errors, setErrors] = useState([])
  const [data, setData] = useState({
    email: appState.user.email,
    password: "",
    currentPassword: "",
    newPassword: "",
    ConfirmNewPassword: "",
  })

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post("/user/profile/me/update-email", data, {
        headers: {
          Authorization: `Bearer ${appState.user.token}`,
        },
      })
      if (res.data.success) {
        setSuccess(res.data.success)
        setErrors([])
      }
    } catch (err) {
      setErrors(err.response.data.errors)
      setSuccess("")
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post("/user/profile/me/update-password", data, {
        headers: {
          Authorization: `Bearer ${appState.user.token}`,
        },
      })
      if (res.data.success) {
        setSuccess(res.data.success)
        setErrors([])
      }
    } catch (err) {
      setErrors(err.response.data.errors)
      setSuccess("")
    }
  }

  if (!appState.loggedIn) {
    return <Redirect to="/" />
  }

  return (
    <Page title="Account">
      <h1>My Account</h1>

      {errors.length > 0
        ? errors.map(function (error, i) {
            return (
              <p className="message error" key={i}>
                {error.msg}
              </p>
            )
          })
        : success.length > 0 && <div className="message success"> {success}</div>}

      <div className="form-section">
        <h3>Update Email Address</h3>
        <form onSubmit={handleEmailSubmit}>
          <p className="form-group">
            <input type="email" placeholder="Email" name="email" value={data.email} onChange={(e) => onChange(e)} />
          </p>
          <p className="form-group">
            <input type="password" placeholder="Current Password" name="password" value={data.password} onChange={(e) => onChange(e)} />
          </p>
          <p className="form-group form-submit">
            <button>Update Email</button>
          </p>
        </form>
      </div>

      <div className="form-section">
        <h3>Update Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <p className="form-group">
            <input type="password" placeholder="Current Password" name="currentPassword" value={data.currentPassword} onChange={(e) => onChange(e)} />
          </p>
          <p className="form-group">
            <input type="password" placeholder="New Password" name="newPassword" value={data.newPassword} onChange={(e) => onChange(e)} />
          </p>
          <p className="form-group">
            <input type="password" placeholder="Confirm Password" name="ConfirmNewPassword" value={data.ConfirmNewPassword} onChange={(e) => onChange(e)} />
          </p>
          <p className="form-group form-submit">
            <button>Update Password</button>
          </p>
        </form>
      </div>
    </Page>
  )
}

export default Account
