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
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import axiosInstance from 'utils/axios';

const statusColor = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/leaves');
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

  const handleAction = async (id, action) => {
    setActing(id + '-' + action);
    try {
      await axiosInstance.put(`/leaves/${id}/${action}`);
      setSnack({ open: true, msg: `Leave ${action}d successfully`, severity: 'success' });
      fetchLeaves();
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to ${action} leave`;
      setSnack({ open: true, msg, severity: 'error' });
    } finally {
      setActing(null);
    }
  };

  const pendingCount = leaves.filter((l) => l.status === 'PENDING').length;

  return (
    <Grid container spacing={3}>
      {/* Stats */}
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4">{leaves.length}</Typography>
            <Typography color="text.secondary">Total Requests</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="warning.main">
              {pendingCount}
            </Typography>
            <Typography color="text.secondary">Pending Review</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="success.main">
              {leaves.filter((l) => l.status === 'APPROVED').length}
            </Typography>
            <Typography color="text.secondary">Approved</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Table */}
      <Grid size={12}>
        <MainCard title="All Leave Requests">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : leaves.length === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary" align="center">
                  No leave requests yet.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell>{l.id}</TableCell>
                      <TableCell>{l.username}</TableCell>
                      <TableCell>{l.leaveType}</TableCell>
                      <TableCell>{l.startDate}</TableCell>
                      <TableCell>{l.endDate}</TableCell>
                      <TableCell>{l.reason || '—'}</TableCell>
                      <TableCell>
                        <Chip label={l.status} color={statusColor[l.status] || 'default'} size="small" />
                      </TableCell>
                      <TableCell align="center">
                        {l.status === 'PENDING' ? (
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              disabled={acting === l.id + '-approve'}
                              onClick={() => handleAction(l.id, 'approve')}
                            >
                              {acting === l.id + '-approve' ? <CircularProgress size={18} /> : 'Approve'}
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              disabled={acting === l.id + '-reject'}
                              onClick={() => handleAction(l.id, 'reject')}
                            >
                              {acting === l.id + '-reject' ? <CircularProgress size={18} /> : 'Reject'}
                            </Button>
                          </Stack>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {l.approvedByUsername ? `By ${l.approvedByUsername}` : '—'}
                          </Typography>
                        )}
                      </TableCell>
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
