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
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { format } from 'date-fns'

const AssignedBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  const menuOpen = Boolean(anchorEl)

  const fetchAssignedBookings = async () => {
    try {
      setLoading(true)
      const response = await baseUrl.get('/agent/assigned-bookings')
      setBookings(response.data.data)
    } catch (err) {
      setError('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (bookingStatus) => {
    if (!selectedBookingId) return

    try {
      await baseUrl.patch(`/agent/edit-booking-status/${selectedBookingId}`, { bookingStatus })

      fetchAssignedBookings()
    } catch (err) {
      console.error('Failed to update status')
    } finally {
      setAnchorEl(null)
    }
  }

  useEffect(() => {
    fetchAssignedBookings()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <CardHeader title="My Assigned Parcels" />
        <CardContent>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                  <TableCell>
                    <b>Booking ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Customer</b>
                  </TableCell>
                  <TableCell>
                    <b>Phone</b>
                  </TableCell>
                  <TableCell>
                    <b>Pickup</b>
                  </TableCell>
                  <TableCell>
                    <b>Delivery</b>
                  </TableCell>
                  <TableCell>
                    <b>Size</b>
                  </TableCell>
                  <TableCell>
                    <b>Payment</b>
                  </TableCell>
                  <TableCell>
                    <b>Total (৳)</b>
                  </TableCell>
                  <TableCell>
                    <b>Created At</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography>No assigned parcels</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.bookingId} hover>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget)
                            setSelectedBookingId(booking.bookingId)
                          }}
                          disabled={booking.bookingStatus === 'DELIVERED'}
                        >
                          Change Status
                        </Button>

                        <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
                          <MenuItem onClick={() => handleStatusUpdate('PICKED_UP')}>
                            Picked Up
                          </MenuItem>

                          <MenuItem onClick={() => handleStatusUpdate('IN_TRANSIT')}>
                            In Transit
                          </MenuItem>

                          <MenuItem onClick={() => handleStatusUpdate('DELIVERED')}>
                            Delivered
                          </MenuItem>

                          <MenuItem onClick={() => handleStatusUpdate('CANCELLED')}>
                            Cancel
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <TableCell>{booking.bookingId}</TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell>{booking.customerName}</TableCell>
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
                        {booking.paymentType === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
                      </TableCell>

                      <TableCell>{booking.totalBill}</TableCell>

                      <TableCell>
                        {format(new Date(booking.createdAt), 'dd MMM yyyy, hh:mm a')}
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

export default AssignedBookings
