import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { format } from 'date-fns'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await baseUrl.get(`/booking`)
        setBookings(response.data.data)
      } catch (err) {
        setError('Failed to fetch bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchUserBookings()
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <CardHeader title="My Bookings" />

        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                  <TableCell>
                    <b>Booking ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Pickup Address</b>
                  </TableCell>
                  <TableCell>
                    <b>Delivery Address</b>
                  </TableCell>
                  <TableCell>
                    <b>Parcel Size</b>
                  </TableCell>
                  <TableCell>
                    <b>Payment Type</b>
                  </TableCell>
                  <TableCell>
                    <b>Total Bill (৳)</b>
                  </TableCell>
                  <TableCell>
                    <b>Date Created</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings.length === 0 ? (
                  <Typography>No bookings found</Typography>
                ) : (
                  bookings.map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link to={`/booking/${booking.bookingId}`}>
                          <IconButton>
                            <VisibilityIcon color="primary" />
                          </IconButton>
                        </Link>
                      </TableCell>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.pickupAddress}</TableCell>
                      <TableCell>{booking.deliveryAddress}</TableCell>
                      <TableCell>
                        {booking.sizeType === 'sm'
                          ? 'Small'
                          : booking.sizeType === 'md'
                            ? 'Medium'
                            : 'Large'}
                      </TableCell>
                      <TableCell>
                        {booking.paymentType === 'cod' ? 'Cash On Delivery' : 'Prepaid'}
                      </TableCell>
                      <TableCell>{booking.totalBill}</TableCell>
                      <TableCell>{format(booking.createdAt, 'do MMMM, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={booking.bookingStatus}
                          size="small"
                          color={
                            {
                              created: 'primary',
                              'picked up': 'info',
                              'in transit': 'warning',
                              delivered: 'success',
                              failed: 'error',
                            }[booking.bookingStatus.toLowerCase()] || 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  )
}

export default MyBookings
