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
  Button,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { format } from 'date-fns'
import AssignAgentModal from '../../../components/AssignAgentModal/AssignAgentModal'

const CreatedBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  useEffect(() => {
    fetchUserBookings()
  }, [])

  const fetchUserBookings = async () => {
    try {
      const response = await baseUrl.get(`/admin/created-bookings`)
      setBookings(response.data.data)
    } catch (err) {
      setError('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <CardHeader title="Created Bookings" />
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
                    <b>Customer Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                  <TableCell>
                    <b>Phone</b>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography>No bookings found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.bookingId}>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setSelectedBookingId(booking.bookingId)
                            setOpen(true)
                          }}
                        >
                          Assign Agent
                        </Button>
                        <AssignAgentModal
                          open={open}
                          bookingId={selectedBookingId}
                          onClose={() => setOpen(false)}
                          onAssigned={fetchUserBookings}
                        />
                      </TableCell>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.customerEmail}</TableCell>
                      <TableCell>{booking.customerPhone}</TableCell>
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
                      <TableCell>
                        {format(new Date(booking.createdAt), 'do MMMM, yyyy hh:mm aa')}
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

export default CreatedBookings
