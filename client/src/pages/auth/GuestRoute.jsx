import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '@/contexts/auth/useAuth';

export default function GuestRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        const from = location.state?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    return children;
}