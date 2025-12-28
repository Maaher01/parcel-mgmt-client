import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Chip,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { baseUrl } from '../../../api/api'
import { useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const BookingDetails = () => {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (!bookingId) return

    getBookingDetails()

    const interval = setInterval(() => {
      getBookingDetails()
    }, 5000)

    return () => clearInterval(interval)
  }, [bookingId])

  const getBookingDetails = async () => {
    try {
      const response = await baseUrl.get(`/booking/${bookingId}`)
      console.log(response.data.data)

      setBooking(response.data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  if (!booking) return <Typography>Loading...</Typography>

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Card elevation={4}>
        <CardHeader
          title={`Booking Details`}
          sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}
        />
        <CardContent>
          {/* Parcel Location Map */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Parcel Location
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                width: '100%',
                height: 350,
                bgcolor: '#f0f0f0',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 1,
              }}
            >
              <MapContainer
                center={[booking.latitude, booking.longitude]}
                zoom={18}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[booking.latitude, booking.longitude]}>
                  <Popup>Parcel current location</Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>

          {/* Customer Info */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Name</Typography>
                <Typography variant="body1">{booking.userName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="body1">{booking.email || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Phone</Typography>
                <Typography variant="body1">{booking.phone || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Agent Info */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Delivery Agent
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Agent Name</Typography>
                <Typography variant="body1">{booking.agentName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Agent Phone</Typography>
                <Typography variant="body1">{booking.agentPhone || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Booking Info */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Booking ID</Typography>
                <Typography variant="body1">{booking.bookingId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={booking.bookingStatus}
                  color={
                    booking.bookingStatus === 'CREATED'
                      ? 'warning'
                      : booking.bookingStatus === 'DELIVERED'
                        ? 'success'
                        : 'info'
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Pickup Address</Typography>
                <Typography variant="body1">{booking.pickupAddress}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Delivery Address</Typography>
                <Typography variant="body1">{booking.deliveryAddress}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Parcel Size</Typography>
                <Typography variant="body1">
                  {booking.sizeType === 'sm'
                    ? 'Small'
                    : booking.sizeType === 'md'
                      ? 'Medium'
                      : 'Large'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Payment Type</Typography>
                <Typography variant="body1">
                  {booking.paymentType === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Total Bill</Typography>
                <Typography variant="body1">৳ {booking.totalBill}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Created At</Typography>
                <Typography variant="body1">
                  {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Last Updated</Typography>
                <Typography variant="body1">
                  {new Date(booking.updatedAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Back Button */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Link to="/my-bookings">
              <Button variant="contained" color="primary">
                Back to Bookings
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default BookingDetails
