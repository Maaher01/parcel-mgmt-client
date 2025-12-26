import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../api/api'

const AssignAgentModal = ({ open, bookingId, onClose, onAssigned }) => {
  const [agents, setAgents] = useState([])
  const [agentId, setAgentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    const fetchAgents = async () => {
      try {
        const res = await baseUrl.get('/admin/agents')
        console.log(res.data.data)

        setAgents(res.data.data)
      } catch {
        setError('Failed to load agents')
      }
    }

    fetchAgents()
  }, [open])

  const handleAssign = async () => {
    if (!agentId || !bookingId) return

    try {
      setLoading(true)
      await baseUrl.post(`/admin/assign-agent/${bookingId}`, {
        agentId,
      })

      onAssigned?.()
      onClose()
      setAgentId('')
    } catch {
      setError('Failed to assign agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Assign Delivery Agent</DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth>
          <InputLabel id="agent-select-label">Select Agent</InputLabel>
          <Select
            labelId="agent-select-label"
            value={agentId}
            label="Select Agent"
            onChange={(e) => setAgentId(Number(e.target.value))}
          >
            {agents.map((agent) => (
              <MenuItem key={agent.user_id} value={agent.user_id}>
                {agent.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAssign} disabled={!agentId || loading}>
          {loading ? <CircularProgress size={20} /> : 'Assign'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AssignAgentModal
