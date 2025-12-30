import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA, CSpinner } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { baseUrl } from '../../api/api'
import RequireRole from '../../routes/RequireRole'

const WidgetsDropdown = (props) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [dailyCODAmount, setDailyCODAmount] = useState(0)
  const [dailyBookings, setDailyBookings] = useState(0)
  const [failedBookings, setFailedBookings] = useState(0)

  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })

    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true)
        const response = await baseUrl.get(`/admin/dashboard-metrics`)
        setDailyCODAmount(response.data.data.getDailyCODAmount)
        setDailyBookings(response.data.data.getDailyBookings)
        setFailedBookings(response.data.data.getFailedBookings)
      } catch (err) {
        setError('Failed to fetch metrics')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardMetrics()
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <RequireRole allowedRoles={['Admin']}>
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol sm={6} md={4}>
          <CWidgetStatsA
            color="success"
            className="pb-4"
            value={loading ? <CSpinner size="sm" /> : dailyBookings}
            title="Today's Bookings"
          />
        </CCol>
        <CCol sm={6} md={4}>
          <CWidgetStatsA
            color="primary"
            className="pb-4"
            value={loading ? <CSpinner size="sm" /> : `৳ ${Math.round(dailyCODAmount)}`}
            title="Today's Income"
          />
        </CCol>
        <CCol sm={6} md={4}>
          <CWidgetStatsA
            color="danger"
            className="pb-4"
            value={loading ? <CSpinner size="sm" /> : failedBookings}
            title="Total Failed Deliveries"
          />
        </CCol>
      </CRow>
    </RequireRole>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
