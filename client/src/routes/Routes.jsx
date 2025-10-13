import { Routes as RRDRoutes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';


const Routes = () => {
    return (
        <RRDRoutes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </RRDRoutes>
    );
};

export default Routes;