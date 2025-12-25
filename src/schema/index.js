import * as yup from 'yup'

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,11}$/

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        'Password must be between 5 to 11 characters and have atleast 1 digit, one uppercase letter and one lowercase letter',
    })
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  phone: yup
    .string()
    .length(11, 'Please enter a valid 11 digit mobile number')
    .required('Mobile number is required'),
  role: yup.string().required('Please select a role'),
})

export const loginFormSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
})
