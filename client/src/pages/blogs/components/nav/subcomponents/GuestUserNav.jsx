import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { documentOutline } from 'ionicons/icons';

const GuestUserNav = () => {
    return (
        <div className='flex items-center gap-x-3 md:gap-x-6'> 

            <Link className='text-gray-400 text-sm md:text-base hidden sm:flex items-center gap-x-2 transition-colors duration-300 ease-in-out hover:text-gray-800' to='/write'>

                <IonIcon icon={documentOutline} />
                
                Write
                                    
            </Link>

            <Link className='bg-black text-white text-sm md:text-base px-4 py-1.5 rounded-full transition-shadow duration-300 ease-in-out hover:shadow-lg' to='/login'>Login</Link>

            <Link className='bg-gray-100 text-sm md:text-base px-4 py-1.5 rounded-full max-sm:hidden transition-shadow duration-300 ease-in-out hover:shadow-lg' to='/register'>Register</Link>

        </div>
    );
}

export default GuestUserNav;