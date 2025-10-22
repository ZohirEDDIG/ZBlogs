import { Routes as RRDRoutes, Route } from 'react-router-dom';

import Blogs from '../pages/blogs/Blogs';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import GuestRoute from '../pages/auth/GuestRoute';

const Routes = () => {
    return (
        <RRDRoutes>
            <Route path='/' element={<Blogs />} />
            <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
            <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
        </RRDRoutes>
    );
};

export default Routes;