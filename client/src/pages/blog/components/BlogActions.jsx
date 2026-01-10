import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { chatbubbleEllipsesOutline, heartOutline, logoTwitter } from 'ionicons/icons';

import useAuth from '@/contexts/auth/useAuth';

const BlogActions = ({ totalLikes, totalComments, blogId, title, authorUsername }) => {
    const { user } = useAuth();

    return (
        <div className='flex flex-col gap-y-4'>

            <hr className='border-gray-100'/>

            <div className='flex items-center gap-x-4'>

                <div className='flex items-center gap-x-2'>

                    <button className='bg-gray-200 p-2 rounded-full flex justify-center items-center' type='button'>

                        <IonIcon icon={heartOutline} className='text-gray-400' />

                    </button>

                    <span className='text-gray-400'>{totalLikes}</span>

                </div>

                <div className='flex items-center gap-x-2'>

                    <button className='bg-gray-200 p-2 rounded-full flex justify-center items-center'  type='button'>

                        <IonIcon icon={chatbubbleEllipsesOutline} className='text-gray-400' />

                    </button>

                    <span className='text-gray-400'>{totalComments}</span>

                </div>

                <div className='ml-auto space-x-6'>

                    {
                    
                        user?.personalInfo.username === authorUsername &&

                        <Link 
                            to={`/write/${blogId}`}
                            className='text-gray-400 underline hover:text-black transition-colors duration-300 ease-in-out'
                        >

                            Edit
                            
                        </Link>
                    
                    }

                    <a 
                        href={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
                        target='_blank'
                    >

                        <IonIcon icon={logoTwitter} className='text-gray-400 hover:text-black transition-colors duration-300 ease-in-out' />

                    </a>
                
                </div>

            </div>

            <hr className='border-gray-100' />

        </div>
    );
};

export default BlogActions;