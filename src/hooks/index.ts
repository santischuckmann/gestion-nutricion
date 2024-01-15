import { useCallback, useEffect, useState } from 'react'
import { request } from '../libraries/axios-lib'

export const useDataFetching = <T>(baseEndpoint: string, onDemand = false) => {
  const [ data, setData ] = useState<T | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)

  const fetchData = useCallback(async (endpoint = '') => {
    setLoading(true)
    setError(false)

    try {
      const response = await request({ method: 'GET', endpoint: baseEndpoint + endpoint })
      setData(response)
    } catch (err) {
      setError(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!onDemand)
      fetchData()
  }, [ fetchData ])

  return { data, loading, error, fetch: fetchData }
}

export const useMutate = <T>() => {
  const [ data, setData ] = useState<T | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)

  const mutate = useCallback(async ({ endpoint, data, method } : { endpoint: string, data: Record<string, unknown> | undefined, method: 'POST' | 'PUT'}) => {
    setLoading(true)
    setError(false)

    try {
      const response = await request({ method, endpoint, data })
      setData(response)
    } catch (err) {
      console.log('err')
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  return { mutate, data, loading, error }
}