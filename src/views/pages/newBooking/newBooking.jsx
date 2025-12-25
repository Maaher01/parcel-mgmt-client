import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../api/api'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import CustomInput from '../../../components/CustomInput/CustomInput'

const NewBooking = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleAddBooking = async (values) => {
    try {
      await axios.post(`${baseUrl}/booking/add`, {
        pickup_address: values.pickupAddress,
        delivery_address: values.deliveryAddress,
        payment_method: values.paymentMethod,
        size_type: values.sizeType,
      })

      navigate('/bookings')
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to create booking')
    }
  }

  return (
    <CContainer className="mt-5" style={{ maxWidth: '500px' }}>
      <CCard>
        <CCardHeader className="text-center fw-bold">Add New Booking</CCardHeader>

        <CCardBody>
          <Formik
            initialValues={{
              pickupAddress: '',
              deliveryAddress: '',
              paymentMethod: '',
              sizeType: '',
            }}
            onSubmit={handleAddBooking}
          >
            {() => (
              <Form className="d-flex flex-column gap-3">
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

                <CInputGroup className="mb-3">
                  <Field as={CFormSelect} name="paymentMethod">
                    <option value="">Select Payment Method</option>
                    <option value="cod">Cash On Delivery</option>
                    <option value="prepaid">Prepaid</option>
                  </Field>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <Field as={CFormSelect} name="sizeType">
                    <option value="">Select Parcel Size</option>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </Field>
                </CInputGroup>

                {error && <CAlert color="danger">{error}</CAlert>}

                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NewBooking
