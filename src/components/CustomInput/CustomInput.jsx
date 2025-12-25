import { useField } from 'formik'
import './CustomInput.css'

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label>{label}</label>
      <input {...props} {...field} className={meta.error && meta.touched ? 'input-error' : ''} />
      {meta.error && meta.touched && <p className="error">{meta.error}</p>}
    </>
  )
}

export default CustomInput
