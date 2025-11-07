import { useEffect } from 'react'
import markerSDK from '@marker.io/browser'

function MarkerFeedback() {
  useEffect(() => {
    async function initMarker() {
      const markerKey = import.meta.env.VITE_MARKER_IO_KEY
      
      if (!markerKey) {
        console.warn('Marker.io key not found. Please set VITE_MARKER_IO_KEY in your .env file')
        return
      }

      try {
        await markerSDK.loadWidget({
          project: markerKey,
        })
      } catch (error) {
        console.error('Error loading Marker.io widget:', error)
      }
    }
    initMarker()
  }, [])

  return null
}

export default MarkerFeedback

