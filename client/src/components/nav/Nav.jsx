import useAuth from '@/contexts/auth/useAuth';
import SearchProvider from '../../pages/search/context/SearchProvider';

import { Logo, SearchBox, GuestUserNav, LoggedUserNav } from './subcomponents';

const Nav = () => {
    const { user } = useAuth();

    return (
        <SearchProvider>

            <nav className='bg-white'>

                <div className='container p-4 mx-auto border-b border-gray-100 flex justify-between items-center'>

                    <div className='flex items-center gap-x-2 md:gap-x-4'>

                        <Logo />

                        <SearchBox />

                    </div>

                    { user ? <LoggedUserNav /> : <GuestUserNav /> }

                </div>

            </nav>

        </SearchProvider>
    );
};

export default Nav;