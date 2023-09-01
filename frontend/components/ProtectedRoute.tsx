import { UserRole } from '@/utils/types';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

const ProtectedRoute: React.FC<{
  allowedRoles: UserRole[]
  children: React.ReactNode
}> = ({ allowedRoles, children }) => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.replace('/login');
      return;
    }

    // Check if the user's role is allowed for this route
    if (!allowedRoles.includes(user.role)) {
      router.replace('/login');
    }
  }, [user])

  if (!user || !isLoggedIn) return <div>Loading...</div>

  return <>
    {children}
  </>
};

export default ProtectedRoute;