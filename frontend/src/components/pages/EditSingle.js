import React, { useEffect, useState, useContext } from "react"
import { useParams, Redirect } from "react-router-dom"
import Axios from "axios"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import StateContext from "../context/State"
import Page from "../templates/Page"

function EditSingle() {
  const appState = useContext(StateContext)
  const { shortUrl } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const [wasSuccess, setWasSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  // show paste
  useEffect(() => {
    const request = Axios.CancelToken.source()
    async function showPaste() {
      try {
        const res = await Axios.get(`/paste/${shortUrl}`, { CancelToken: request.token })
        if (res.data.paste) {
          setTitle(res.data.paste.title)
          setContent(res.data.paste.paste)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    showPaste()
    return () => {
      request.cancel()
    }
  }, [])

  // edit paste
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await Axios.post(
        `/paste/edit/${shortUrl}`,
        { title, paste: content },
        {
          headers: {
            Authorization: `Bearer ${appState.user.token}`,
          },
        }
      )
      if (res.data.success) {
        setWasSuccess(true)
      } else {
        setErrors(res.data.errors)
      }
    } catch (err) {
      setErrors([{ msg: "Something went wrong, please refresh and try again" }])
    }
  }

  if (wasSuccess) {
    return <Redirect to={`/paste/${shortUrl}`} />
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <Page title="Edit Paste">
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
        <input
          type="text"
          placeholder="Paste title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <ReactQuill value={content} onChange={setContent} />
        <p className="form-group form-submit">
          <button>Update Paste</button>
        </p>
      </form>
    </Page>
  )
}

export default EditSingle
