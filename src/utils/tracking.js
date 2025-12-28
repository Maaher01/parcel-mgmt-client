import { baseUrl } from '../api/api'

let watchId = null

export function startTracking(bookingId, token) {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser')
    return
  }

  watchId = navigator.geolocation.watchPosition(
    async (position) => {
      const { latitude, longitude } = position.coords

      await baseUrl.post(
        `/agent/location`,
        {
          latitude,
          longitude,
          bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    (error) => {
      console.error('Geolocation error:', error.message)
    },
    {
      enableHighAccuracy: false,
      timeout: 3000,
    },
  )
}

export function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
  }
}

let lastSent = 0

export function shouldSend() {
  const now = Date.now()
  if (now - lastSent > 5000) {
    lastSent = now
    return true
  }
  return false
}
