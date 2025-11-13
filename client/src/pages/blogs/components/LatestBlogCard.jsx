import { Link } from 'react-router-dom';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';

import { format } from 'date-fns';

const LatestBlogCard = ({ blog }) => {
    return (
        <div className='grid grid-cols-1 min-[700px]:grid-cols-2 items-center gap-10'>

            <div className='flex flex-col gap-y-4'>

                <Link className='flex items-center gap-x-2' to={`/profile/${blog.author.personalInfo.username}`}>

                    <div>

                        <img className='w-10 h-10 rounded-full' src={blog.author.personalInfo.profileImage} alt='Author profile image' />

                    </div>

                    <span className='text-gray-500 text-xs sm:text-sm'>@{blog.author.personalInfo.username}</span>

                    <span className='text-gray-500 text-xs sm:text-sm'>{format(new Date(blog.createdAt), 'dd LLL yyyy')}</span>

                </Link>

                <Link to={`/blog/${blog.blogId}`}  className='text-xl sm:text-2xl line-clamp-1'>{blog.title}</Link>

                <Link to={`/blog/${blog.blogId}`} className='text-xs sm:text-sm line-clamp-2'>{blog.description}</Link>

                <div className='flex flex-wrap items-center gap-2'>

                    {

                        blog.topics.map((topic, index) => {

                            if (index > 2) return;

                            return <span key={index} className='text-xs sm:text-sm text-gray-500'>#{topic}</span>;

                        })

                    }

                    <button className='w-fit text-gray-500 ml-4 flex items-center gap-x-2 transition-all duration-300 ease-in-out hover:text-gray-800' type='button'>
                        
                        <IonIcon icon={heartOutline} className='sm:text-2xl' />

                        <span className='text-xs sm:text-sm'>{blog.activity.totalLikes}</span>

                    </button>

                </div>

            </div>

            <Link className='hidden min-[700px]:block' to={`/blog/${blog.blogId}`}>

                <img className='ml-auto h-40 xl:h-30 2xl:h-40 aspect-video' src={blog.cover} alt={blog.title} />

            </Link>

        </div>
    );
};

export default LatestBlogCard;