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
  Stack,
} from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { baseUrl } from '../../../api/api'
import { format } from 'date-fns'
import { startTracking, stopTracking } from '../../../utils/tracking'
import AuthContext from '../../../context/AuthContext'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling', 'transport'],
})

const AssignedBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  const { token } = useContext(AuthContext)

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

      // Start tracking if status is PICKED_UP
      if (bookingStatus === 'PICKED_UP') {
        startTracking(selectedBookingId, token)
      }

      // Stop tracking when DELIVERED or CANCELLED
      if (['DELIVERED', 'CANCELLED'].includes(bookingStatus)) {
        stopTracking()
      }
    } catch (err) {
      console.error('Failed to update status')
    } finally {
      setAnchorEl(null)
    }
  }

  useEffect(() => {
    fetchAssignedBookings()
  }, [])

  useEffect(() => {
    bookings.forEach((b) => {
      socket.emit('join-booking', b.bookingId)
    })

    socket.on('booking-status-updated', (data) => {
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === data.bookingId ? { ...b, bookingStatus: data.bookingStatus } : b,
        ),
      )

      toast.info(`Booking ${data.booking_id} status updated: ${data.booking_status}`, {
        position: 'top-right',
        autoClose: 5000,
      })
    })

    return () => {
      socket.off('booking-status-updated')
    }
  }, [bookings])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <CardHeader title="Assigned Parcels" />
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
                        <Stack direction="row" spacing={1}>
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
                          <Link to={`/optimized-route/${booking.bookingId}`}>
                            <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              disabled={booking.bookingStatus === 'CREATED'}
                            >
                              View Optimized Route
                            </Button>
                          </Link>
                        </Stack>

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
