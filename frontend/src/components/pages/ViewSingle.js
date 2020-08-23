import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import Page from "../templates/Page"

function ViewSingle() {
  const { shortUrl } = useParams()
  const [paste, setPaste] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const request = Axios.CancelToken.source()
    async function showPaste() {
      try {
        const res = await Axios.get(`/paste/${shortUrl}`, { CancelToken: request.token })
        if (res.data.paste) {
          setPaste(res.data.paste)
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

  if (loading) {
    return <>Loading...</>
  }

  const date = new Date(paste.date)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={paste.title}>
      <div className="paste-container">
        <div className="paste-meta">
          <span className="postedBy">
            By:
            {paste.user === null ? " Unknown" : " " + paste.user.name}
          </span>

          <span className="createdAt">At: {dateFormatted}</span>
          <span className="views">Views: {paste.views}</span>
          <Link className="edit-paste" to={`/paste/edit/${paste.shortUrl}`}>
            Edit
          </Link>
        </div>
        <h1 className="paste-title">{paste.title}</h1> <div className="paste-content" dangerouslySetInnerHTML={{ __html: paste.paste }}></div>
      </div>
    </Page>
  )
}

export default ViewSingle
