import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import axiosInstance from 'utils/axios';
import useAuth from 'contexts/AuthContext';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AuthRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  useEffect(() => {
    if (password) {
      const temp = strengthIndicator(password);
      setStrength(temp);
      setLevel(strengthColor(temp));
    } else {
      setStrength(0);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !email.trim() || !password) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/register', {
        username: username.trim(),
        email: email.trim(),
        password,
        role
      });
      login(res.data.token, res.data.username, res.data.role);
      navigate('/leaves', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with your details</Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="register-username">Username</InputLabel>
        <OutlinedInput id="register-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="register-email">Email Address</InputLabel>
        <OutlinedInput id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="register-password">Password</InputLabel>
        <OutlinedInput
          id="register-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()} edge="end" size="large">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomFormControl>

      {strength !== 0 && (
        <FormControl fullWidth>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
              <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
                {level?.label}
              </Typography>
            </Stack>
          </Box>
        </FormControl>
      )}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="register-role">Role</InputLabel>
        <Select id="register-role" value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="EMPLOYEE">Employee</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </CustomFormControl>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
