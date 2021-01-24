/**
 * not sure this is great
 * seems to make for jumpy ui when used
 */
import { useState, useEffect } from 'react'

const getWindowSize = () => {
  if (typeof window !== 'undefined') {
    const w = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const width = w.innerWidth || e.clientWidth || g.clientWidth
    const height = w.innerHeight || e.clientHeight || g.clientHeight
    return { width, height }
  }
  return undefined
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowSize
}

export default useWindowSize
