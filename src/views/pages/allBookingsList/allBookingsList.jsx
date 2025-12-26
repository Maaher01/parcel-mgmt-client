import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Typography,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { format } from 'date-fns'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from '@mui/material'

const AllBookingsList = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleExportPdf = () => {
    const doc = new jsPDF()

    const tableColumns = [
      'BookingID',
      'Customer',
      'Phone',
      'Pickup',
      'Delivery',
      'Status',
      'Agent',
      'Total',
      'CreatedAt',
    ]
    const tableRows = bookings.map((b) => [
      b.bookingId,
      b.customerName,
      b.customerPhone,
      b.pickupAddress,
      b.deliveryAddress,
      b.bookingStatus,
      b.agentName || 'Not Assigned',
      b.totalBill,
      format(new Date(b.createdAt), 'dd MMM yyyy hh:mm a'),
    ])

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    })

    doc.save('all-bookings.pdf')
  }

  const handleExportCsv = () => {
    const formatted = bookings.map((b) => ({
      BookingID: b.bookingId,
      Customer: b.customerName,
      Phone: b.customerPhone,
      Pickup: b.pickupAddress,
      Delivery: b.deliveryAddress,
      Status: b.bookingStatus,
      Agent: b.agentName || 'Not Assigned',
      Total: b.totalBill,
      CreatedAt: format(new Date(b.createdAt), 'dd MMM yyyy hh:mm a'),
    }))

    const config = mkConfig({
      filename: 'all-bookings',
      useKeysAsHeaders: true,
    })

    const csv = generateCsv(config)(formatted)
    download(config)(csv)
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await baseUrl.get('/admin/bookings')
      console.log(response.data.data)

      setBookings(response.data.data)
    } catch (err) {
      setError('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          title="All Bookings"
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleExportCsv}
                disabled={bookings.length === 0}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                color="danger"
                size="small"
                onClick={handleExportPdf}
                disabled={bookings.length === 0}
              >
                Export PDF
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Customer</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
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
                    <b>Parcel Size</b>
                  </TableCell>
                  <TableCell>
                    <b>Payment Type</b>
                  </TableCell>
                  <TableCell>
                    <b>Total Bill (৳)</b>
                  </TableCell>
                  <TableCell>
                    <b>Booking Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Agent</b>
                  </TableCell>
                  <TableCell>
                    <b>Agent Phone</b>
                  </TableCell>
                  <TableCell>
                    <b>Created At</b>
                  </TableCell>
                  <TableCell>
                    <b>Updated At</b>
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
                      <TableCell>
                        {booking.agentName ? (
                          <Typography>{booking.agentName}</Typography>
                        ) : (
                          <Chip label="Not Assigned" color="warning" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        {booking.agentPhone ? (
                          <Typography>{booking.agentPhone}</Typography>
                        ) : (
                          <Typography color="text.secondary">—</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(booking.createdAt), 'dd MMM yyyy, hh:mm a')}
                      </TableCell>
                      <TableCell>
                        {format(new Date(booking.updatedAt), 'dd MMM yyyy, hh:mm a')}
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

export default AllBookingsList
