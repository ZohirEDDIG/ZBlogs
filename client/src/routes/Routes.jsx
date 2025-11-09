import { Routes as RRDRoutes, Route } from 'react-router-dom';

import Blogs from '../pages/blogs/Blogs';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Write from '../pages/write/Write';

import GuestRoute from '../pages/auth/GuestRoute';
import ProtectedRoute from '../pages/auth/ProtectedRoute';

import WriteProvider from '../pages/write/context/WriteProvider';
import BlogsProvider from '../pages/blogs/context/BlogsProvider';

const Routes = () => {
    return (
        <RRDRoutes>
            <Route path='/' element={<BlogsProvider><Blogs /></BlogsProvider>} />
            <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
            <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
            <Route path='/write' element={
                <ProtectedRoute>
                    <WriteProvider>
                        <Write />
                    </WriteProvider>
                </ProtectedRoute>
            } />
        </RRDRoutes>
    );
};

export default Routes;