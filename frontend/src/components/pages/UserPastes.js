import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import StateContext from "../context/State"
import Page from "../templates/Page"

function UserPastes() {
  const appState = useContext(StateContext)
  const [loading, setLoading] = useState(true)
  const [pastes, setPastes] = useState({})

  useEffect(() => {
    const request = Axios.CancelToken.source()
    async function getPastes() {
      try {
        const res = await Axios.post("/paste/my-pastes", [], {
          CancelToken: request.token,
          headers: {
            Authorization: `Bearer ${appState.user.token}`,
          },
        })
        if (res.data.pastes) {
          setPastes(res.data.pastes)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getPastes()
    return () => {
      request.cancel()
    }
  }, [])

  function dateFormatted(date) {
    date = new Date(date)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <Page title="Pastes">
      <div className="pastes">
        {pastes.length ? (
          pastes.map(function (paste, i) {
            return (
              <div key={i} className="paste">
                {paste.title ? (
                  <h2>
                    <Link to={`/paste/${paste.shortUrl}`}>{paste.title}</Link>
                  </h2>
                ) : (
                  <h2>
                    <Link to={`/paste/${paste.shortUrl}`}>Untitled</Link>
                  </h2>
                )}
                <p>On: {dateFormatted(paste.date)}</p>
                <p>Views: {paste.views}</p>
              </div>
            )
          })
        ) : (
          <p>No pastes yet...</p>
        )}
      </div>
    </Page>
  )
}

export default UserPastes
