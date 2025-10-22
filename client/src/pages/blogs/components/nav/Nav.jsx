import useAuth from '@/contexts/auth/useAuth';
import { Logo, SearchBox, GuestUserNav, LoggedUserNav } from './subcomponents';

const Nav = () => {
    const { user } = useAuth();

    return (
        <nav className='bg-white'>

            <div className='ctn border-b border-gray-100 flex justify-between items-center'>

                <div className='flex items-center gap-x-2 md:gap-x-4'>

                    <Logo />

                    <SearchBox />

                </div>

                { user ? <LoggedUserNav /> : <GuestUserNav /> }

            </div>

        </nav>
    );
};

export default Nav;