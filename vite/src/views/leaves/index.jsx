import useAuth from 'contexts/AuthContext';
import EmployeeLeaves from './EmployeeLeaves';
import AdminLeaves from './AdminLeaves';

export default function LeavesPage() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminLeaves /> : <EmployeeLeaves />;
}
