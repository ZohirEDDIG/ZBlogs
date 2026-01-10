import { Routes as RRDRoutes, Route } from 'react-router-dom';

import Blogs from '../pages/blogs/Blogs';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Write from '../pages/write/Write';
import Search from '../pages/search/Search';
import User from '../pages/user/User';
import NotFound from '../pages/NotFound';
import Blog from '../pages/blog/Blog';

import GuestRoute from '../pages/auth/GuestRoute';
import ProtectedRoute from '../pages/auth/ProtectedRoute';

import WriteProvider from '../pages/write/context/WriteProvider';
import BlogsProvider from '../pages/blogs/context/BlogsProvider';
import SearchProvider from '../pages/search/context/SearchProvider';
import UserProvider from '../pages/user/context/UserProvider';
import BlogProvider from '../pages/blog/context/BlogProvider';

const Routes = () => {
    return (
        <RRDRoutes>
            <Route path='/' element={<BlogsProvider><Blogs /></BlogsProvider>} />
            <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
            <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
            <Route
                path='/write'
                element={
                    <ProtectedRoute>
                        <WriteProvider>
                            <Write />
                        </WriteProvider>
                    </ProtectedRoute>
                }
            />
            <Route 
                path='/search/:query' 
                element={
                    <SearchProvider>
                        <Search />
                    </SearchProvider>
                }
            />
            <Route 
                path='/user/:username' 
                element={
                    <UserProvider>
                        <User />
                    </UserProvider>
                }
            />
            <Route 
                path='/blog/:blogId' 
                element={
                    <BlogProvider>
                        <Blog />
                    </BlogProvider>
                } 
            />
            <Route path='*' element={<NotFound />} />
        </RRDRoutes>
    );
};

export default Routes;