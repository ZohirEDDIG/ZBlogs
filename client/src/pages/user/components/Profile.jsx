import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { logoFacebook, logoGithub, logoInstagram, logoTwitter, globeOutline } from 'ionicons/icons';

import { format } from 'date-fns';

import useAuth from '@/contexts/auth/useAuth';

const icons = [
    <IonIcon icon={logoFacebook} />,
    <IonIcon icon={logoInstagram} />,
    <IonIcon icon={logoTwitter} />,
    <IonIcon icon={logoGithub} />,
    <IonIcon icon={globeOutline} />
];

const Profile = ({ user }) => {
    const { user: currentUser } = useAuth();

    return (
        <section>

            <div className='flex flex-col items-center gap-y-4'>

                <div>

                    <img 
                        className='w-15 rounded-full'
                        src={user.personalInfo.profileImage} 
                        alt={`${user.personalInfo.username} profile image`}

                    />
                
                </div>

                <span>{user.personalInfo.fullName}</span>

                <span className='text-gray-400 text-sm'>@{user.personalInfo.username}</span>

                <span className='text-gray-400 text-sm'>{user.accountInfo.totalPosts} Blogs - {user.accountInfo.totalReads} Reads</span>

                { (currentUser?.personalInfo.username === user.personalInfo.username) && 
                
                    <Link 
                        className='bg-gray-100 text-sm md:text-base px-4 py-2 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-lg'
                        to='/settings/edit-profile'
                    >
                        
                        Edit Profile

                    </Link>
                }

                <p className='text-gray-400 text-sm text-center'>{user.personalInfo.bio || 'No bio yet'}</p>

                <div className='flex justify-center items-center gap-x-4'>

                    {
                        Object.entries(user.socialLinks).map((socialLink, index) => {
                            
                            if (socialLink[1]) {
                                return (
                                    <a 
                                        className='text-gray-400 text-2xl transition-colors duration-300 ease-in-out hover:text-gray-600'
                                        href={socialLink[1]}
                                        target='_blank'
                                        key={index}
                                    >
                                    
                                        {icons[index]}

                                    </a>
                            )}

                        })
                    }

                </div>

                <p className='text-gray-400 text-sm text-center'>Joined on {format(user.createdAt, 'dd LLL yyyy')}</p>

            </div>

        </section>
    );
};

export default Profile;