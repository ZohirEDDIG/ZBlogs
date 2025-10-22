import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { documentOutline, notificationsOutline, personOutline, gridOutline, pencilOutline, logOutOutline } from 'ionicons/icons';

import useAuth from '@/contexts/auth/useAuth';
import { useClickOutside } from '@/hooks';

const LoggedUserNav = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef();
    const dropdownButtonRef = useRef();

    useClickOutside(dropdownRef, dropdownButtonRef, setDropdownVisible);

    const toggleDropdownVisibility = () => {
        setDropdownVisible((prev) => !prev)
    };
    
    const { user, logout } = useAuth();

    return (
        <div className='flex items-center gap-x-3 md:gap-x-6'>

            <Link className='text-gray-500 text-sm md:text-base hidden sm:flex items-center gap-x-1 transition-all duration-300 ease-in-out hover:text-gray-800' to='/write'>

                <IonIcon icon={documentOutline} />

                Write
            
            </Link>
            
            <Link className='bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-200' to='/dashboard/notifications'>

                <IonIcon className='text-gray-400' icon={notificationsOutline} />
            
            </Link>

            <button ref={dropdownButtonRef} className='relative' type='button' onClick={toggleDropdownVisibility}>

                <img className='w-8 h-8 rounded-full' src={user.personalInfo.profileImage} alt='User profile image' />

                <div ref={dropdownRef} className={`w-[180px] bg-gray-100 py-4 rounded-md flex flex-col gap-y-2 cursor-auto select-text absolute right-0 ${dropdownVisible ? 'top-14' : '-top-[300px]'} -z-10 transition-all duration-300 ease-in-out`}>

                    <Link className='w-full text-gray-500 text-sm md:text-base px-4 py-2  flex items-center gap-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200' to='/write'>

                        <IonIcon icon={documentOutline} />

                        Write
                    
                    </Link>

                    <Link className='w-full text-gray-500 text-sm md:text-base px-4 py-2  flex items-center  gap-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200' to={`/profile/${user.personalInfo.username}`}>

                        <IonIcon icon={personOutline} />

                        Profile
                    
                    </Link>

                    <Link className='w-full text-gray-500 text-sm md:text-base px-4 py-2  flex items-center  gap-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200' to='/dashboard'>

                        <IonIcon icon={gridOutline} />

                        Dashboard
                    
                    </Link>

                    <Link className='w-full text-gray-500 text-sm md:text-base px-4 py-2  flex items-center  gap-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200' to='/dashboard/edit-profile'>

                        <IonIcon icon={pencilOutline} />

                        Edit Profile
                    
                    </Link>

                    <hr className='w-full border border-gray-200' />

                    <button className='text-sm flex flex-col gap-y-2' type='button'>

                        <h6 className='w-full text-left text-gray-600 px-4 cursor-auto select-text'>@{user.personalInfo.username}</h6>

                        <div  className='w-full text-gray-500 px-4  py-2  flex items-center gap-x-2 transition-all duration-300 ease-in-out hover:bg-gray-200' onClick={logout}>

                            <IonIcon icon={logOutOutline} />

                            Logout 

                        </div>

                    </button>

                </div>

            </button>

        </div>
    
    );
};

export default LoggedUserNav;


