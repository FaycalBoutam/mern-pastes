import React, { useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Page from "../templates/Page"

function SignUp() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
    agreed: "",
  })
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState("")

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setdata({ ...data, [e.target.name]: e.target.checked })
    } else {
      setdata({ ...data, [e.target.name]: e.target.value })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post("/user/signup", data)
      if (res.data.success) {
        setSuccess(res.data.success)
      }
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <Page title="Sign Up">
      <h1>Registration</h1>

      {errors.length
        ? errors.map(function (error, i) {
            return (
              <p className="message error" key={i}>
                {error.msg}
              </p>
            )
          })
        : success.length > 0 && <p className="message success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <p className="form-group">
          <input type="text" placeholder="Name" name="name" value={data.name} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group">
          <input type="email" placeholder="Email" name="email" value={data.email} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group">
          <input type="password" placeholder="Password" name="password" value={data.password} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group">
          <input type="password" placeholder="Confirm Password" name="passwordAgain" value={data.passwordAgain} onChange={(e) => onChange(e)} />
        </p>
        <p className="form-group">
          <input type="checkbox" name="agreed" onChange={(e) => onChange(e)} /> I have read and agree to the <Link to="/tos">terms of service</Link> & <Link to="privacy-policy">privacy policy</Link>
        </p>
        <p className="form-group form-submit">
          <button>Sign Up</button>
        </p>
      </form>
    </Page>
  )
}

export default SignUp
