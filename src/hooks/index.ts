import { useCallback, useEffect, useState } from 'react'
import { request } from '../libraries/axios-lib'

export const useDataFetching = <T>(endpoint: string) => {
  const [ data, setData ] = useState<T | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const response = await request({ method: 'GET', endpoint })
      setData(response)
    } catch (err) {
      setError(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [ fetchData ])

  return { data, loading, error }
}


export const useMutate = <T>() => {
  const [ data, setData ] = useState<T | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)

  const mutate = useCallback(async ({ endpoint, data } : { endpoint: string, data: Record<string, unknown> | undefined}) => {
    setLoading(true)
    setError(false)

    try {
      const response = await request({ method: 'POST', endpoint, data })
      setData(response)
    } catch (err) {
      setError(true)
    }
    setLoading(false)
  }, [])

  return { mutate, data, loading, error }
}