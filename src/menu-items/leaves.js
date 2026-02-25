import { IconCalendar } from '@tabler/icons-react';

const leaves = {
  id: 'leave-management',
  title: 'Leave Management',
  type: 'group',
  children: [
    {
      id: 'leaves',
      title: 'Leave Requests',
      type: 'item',
      url: '/leaves',
      icon: IconCalendar,
      breadcrumbs: false
    }
  ]
};

export default leaves;
