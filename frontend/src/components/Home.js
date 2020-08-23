import React, { useState, useContext } from "react"
import { Redirect } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Axios from "axios"
import stateContext from "./context/State"
import Page from "./templates/Page"

function Home() {
  const appState = useContext(stateContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const [wasSuccess, setWasSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post("/paste/new", { title, pasteContent: content, user: appState.user.id })
      if (res.data.success) {
        setWasSuccess(res.data.paste.shortUrl)
      }
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  if (wasSuccess) {
    return <Redirect to={`/paste/${wasSuccess}`} />
  }

  return (
    <Page title="Home">
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
        <input type="text" placeholder="Paste title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ReactQuill value={content} onChange={setContent} />
        <p className="form-group form-submit">
          <button>Create Paste</button>
        </p>
      </form>
    </Page>
  )
}

export default Home
