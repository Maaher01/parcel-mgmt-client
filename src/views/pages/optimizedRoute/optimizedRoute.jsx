import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { Container, Card, CardHeader, CardContent, Box, CircularProgress } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

const optimizedRoute = () => {
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { bookingId } = useParams()

  useEffect(() => {
    if (!bookingId) return

    getDeliveryOptimizedRoute()
  }, [bookingId])

  const getDeliveryOptimizedRoute = async () => {
    try {
      setLoading(true)

      const bookingRes = await baseUrl.get(`/booking/${bookingId}`)
      const deliveryAddress = bookingRes.data.data.deliveryAddress

      const agentLoc = await baseUrl.get('/agent/location/latest')
      const agentLatLong = {
        lat: Number(agentLoc.data.lat),
        lng: Number(agentLoc.data.lng),
      }

      const geoRes = await baseUrl.get(`/geo/geocode`, { params: { deliveryAddress } })
      const deliveryLatLong = {
        lat: Number(geoRes.data.lat),
        lng: Number(geoRes.data.lon),
      }

      const optimizedRouteRes = await baseUrl.post(`/geo/optimized-route`, {
        latlong: [agentLatLong, deliveryLatLong],
      })

      const routeCoords = optimizedRouteRes.data.geometry.coordinates.map(([lng, lat]) => [
        lat,
        lng,
      ])

      setRoute(routeCoords)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Card elevation={4}>
        <CardHeader
          title={`Optimized Delivery Route`}
          sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}
        />
        <CardContent>
          <Box
            sx={{
              width: '100%',
              height: 600,
              bgcolor: '#f0f0f0',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 1,
            }}
          >
            {loading && (
              <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}
              >
                <h5>Calculating optimized route...</h5>
                <CircularProgress size={60} thickness={4} />
              </div>
            )}

            {!loading && route && (
              <MapContainer center={route[0]} zoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={route[0]}>
                  <Popup>Your Current Location</Popup>
                </Marker>

                <Marker position={route[route.length - 1]}>
                  <Popup>Delivery Location</Popup>
                </Marker>

                <Polyline positions={route} color="blue" weight={5} />
              </MapContainer>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default optimizedRoute
