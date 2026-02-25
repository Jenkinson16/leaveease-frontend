import { useCallback, useEffect, useState } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import axiosInstance from 'utils/axios';

const statusColor = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const [leaveType, setLeaveType] = useState('ANNUAL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState('');

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/leaves/my');
      setLeaves(res.data);
    } catch {
      setSnack({ open: true, msg: 'Failed to fetch leaves', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!startDate || !endDate) {
      setFormError('Start date and end date are required');
      return;
    }
    if (startDate >= endDate) {
      setFormError('Start date must be before end date');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (startDate < today) {
      setFormError('Start date must be today or later');
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post('/leaves', { leaveType, startDate, endDate, reason: reason || undefined });
      setSnack({ open: true, msg: 'Leave request submitted!', severity: 'success' });
      setStartDate('');
      setEndDate('');
      setReason('');
      setLeaveType('ANNUAL');
      fetchLeaves();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit leave';
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Submit Leave Form */}
      <Grid size={12}>
        <MainCard title="Submit Leave Request">
          <form onSubmit={handleSubmit}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomFormControl fullWidth>
                  <InputLabel>Leave Type</InputLabel>
                  <Select value={leaveType} label="Leave Type" onChange={(e) => setLeaveType(e.target.value)}>
                    <MenuItem value="ANNUAL">Annual</MenuItem>
                    <MenuItem value="SICK">Sick</MenuItem>
                    <MenuItem value="CASUAL">Casual</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomFormControl fullWidth>
                  <InputLabel shrink>Start Date</InputLabel>
                  <OutlinedInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </CustomFormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomFormControl fullWidth>
                  <InputLabel shrink>End Date</InputLabel>
                  <OutlinedInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </CustomFormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomFormControl fullWidth>
                  <InputLabel>Reason</InputLabel>
                  <OutlinedInput value={reason} onChange={(e) => setReason(e.target.value)} label="Reason" placeholder="Optional" />
                </CustomFormControl>
              </Grid>
              <Grid size={12}>
                <Button type="submit" variant="contained" color="secondary" disabled={submitting}>
                  {submitting ? <CircularProgress size={22} color="inherit" /> : 'Submit Leave'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      </Grid>

      {/* My Leaves Table */}
      <Grid size={12}>
        <MainCard title="My Leave Requests">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : leaves.length === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary" align="center">
                  No leave requests found. Submit your first leave above!
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reviewed By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell>{l.id}</TableCell>
                      <TableCell>{l.leaveType}</TableCell>
                      <TableCell>{l.startDate}</TableCell>
                      <TableCell>{l.endDate}</TableCell>
                      <TableCell>{l.reason || '—'}</TableCell>
                      <TableCell>
                        <Chip label={l.status} color={statusColor[l.status] || 'default'} size="small" />
                      </TableCell>
                      <TableCell>{l.approvedByUsername || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </MainCard>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
