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
  CircularProgress,
  Alert,
  Typography,
  Chip,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/api'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from '@mui/material'

const AllUsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleExportPdf = () => {
    const doc = new jsPDF()

    const tableColumns = ['User ID', 'Name', 'Email', 'Role', 'Phone']
    const tableRows = users.map((u) => [u.user_id, u.name, u.email, u.role, u.phone])

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    })

    doc.save('all-users.pdf')
  }

  const handleExportCsv = () => {
    const formatted = users.map((u) => ({
      UserID: u.userId,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Phone: u.phone,
    }))

    const config = mkConfig({
      filename: 'all-users',
      useKeysAsHeaders: true,
    })

    const csv = generateCsv(config)(formatted)
    download(config)(csv)
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await baseUrl.get(`/admin/users`)
      setUsers(response.data.data)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          title="All Users"
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleExportCsv}
                disabled={users.length === 0}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                color="danger"
                size="small"
                onClick={handleExportPdf}
                disabled={users.length === 0}
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
                    <b>User ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                  <TableCell>
                    <b>Phone</b>
                  </TableCell>
                  <TableCell>
                    <b>Role</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography>No users found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{user.user_id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          color={
                            {
                              Admin: 'primary',
                              Customer: 'default',
                              'Delivery Agent': 'success',
                            }[user.role] || 'default'
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

export default AllUsersList
