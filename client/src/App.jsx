import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './contexts/auth/AuthProvider';

import Routes from './routes/Routes';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <AuthProvider>

                <Routes />

                <Toaster />

            </AuthProvider>
            
        </QueryClientProvider>
    );
};

export default App;