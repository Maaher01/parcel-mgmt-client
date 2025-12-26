import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../api/api'
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import CustomInput from '../../../components/CustomInput/CustomInput'

const NewBooking = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleAddBooking = async (values) => {
    try {
      await baseUrl.post('/booking/add', {
        pickupAddress: values.pickupAddress,
        deliveryAddress: values.deliveryAddress,
        paymentType: values.paymentType,
        sizeType: values.sizeType,
      })

      navigate('/')
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to create booking')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          title="Book New Courier"
          titleTypographyProps={{ align: 'center', fontWeight: 'bold' }}
        />

        <CardContent>
          <Formik
            initialValues={{
              pickupAddress: '',
              deliveryAddress: '',
              paymentType: '',
              sizeType: '',
            }}
            onSubmit={handleAddBooking}
          >
            {({ values, handleChange }) => (
              <Form>
                <Stack spacing={3}>
                  <CustomInput
                    label="Pickup Address"
                    name="pickupAddress"
                    placeholder="Enter pickup address"
                    type="text"
                  />

                  <CustomInput
                    label="Delivery Address"
                    name="deliveryAddress"
                    placeholder="Enter delivery address"
                    type="text"
                  />
                  <TextField
                    select
                    label="Payment Method"
                    name="paymentType"
                    value={values.paymentType}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="">Select Payment Method</MenuItem>
                    <MenuItem value="cod">Cash On Delivery</MenuItem>
                    <MenuItem value="prepaid">Prepaid</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Parcel Size"
                    name="sizeType"
                    value={values.sizeType}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="">Select Parcel Size</MenuItem>
                    <MenuItem value="sm">Small</MenuItem>
                    <MenuItem value="md">Medium</MenuItem>
                    <MenuItem value="lg">Large</MenuItem>
                  </TextField>

                  <Alert severity="success">
                    Small parcels (less than 1kg) delivery charge: <strong>100 TK</strong>
                    <br />
                    Medium parcels (1kg-10kg) delivery charge: <strong>200 TK</strong>
                    <br />
                    Large parcels (more than 10kg) delivery charge: <strong>300 TK</strong>
                    <br />
                  </Alert>

                  {error && <Alert severity="error">{error}</Alert>}

                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  )
}

export default NewBooking
