import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone } from '@coreui/icons'
import { registerFormSchema } from '../../../schema'
import { Form, Formik, Field } from 'formik'
import CustomInput from '../../../components/CustomInput/CustomInput'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from '../../../api/api'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleRegister = async (values) => {
    try {
      const formData = new FormData()

      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('role', values.role)
      formData.append('phone', values.phone)

      await baseUrl.post(`/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone,
      })

      navigate('/login')
    } catch (error) {
      console.error('Registration Failed:', error)
      setError(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    role: '',
                  }}
                  validationSchema={registerFormSchema}
                  onSubmit={handleRegister}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <h1>Register</h1>
                      <p className="text-body-secondary">Create your account</p>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CustomInput placeholder="Username" type="text" name="name" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CustomInput placeholder="Email" type="email" name="email" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilPhone} />
                        </CInputGroupText>
                        <CustomInput placeholder="Phone" type="text" name="phone" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput placeholder="Password" type="password" name="password" />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput
                          type="password"
                          placeholder="Repeat password"
                          name="confirmPassword"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <Field as={CFormSelect} name="role">
                          <option>Select your role</option>
                          <option value="Admin">Admin</option>
                          <option value="Delivery Agent">Delivery Agent</option>
                          <option value="Customer">Customer</option>
                        </Field>
                      </CInputGroup>

                      {error && <CAlert color="danger">{error}</CAlert>}
                      <div className="d-grid">
                        <CButton color="success" type="submit">
                          Create Account
                        </CButton>
                      </div>

                      <p className="text-body-secondary text-center mt-3">
                        Already have an account?{' '}
                        <span>
                          <Link to="/login" className="px-0">
                            Login
                          </Link>
                        </span>{' '}
                        Now
                      </p>
                    </Form>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
