import { useEffect, useState } from 'react'

export const useFetch = (props) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    setLoading(true)
    setError(null)

    fetch('http://127.0.0.1:8000/obtenerDatos/?format=json')
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json) {
          setData(json)
        } else {
          setData([])
        }
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])
  return { data, loading, error }
}