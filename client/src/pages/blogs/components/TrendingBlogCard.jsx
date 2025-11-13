import { Link } from 'react-router-dom';

import { format } from 'date-fns';

const TrendingBlogCard = ({ number, blog }) => {
    return (
        <div className='flex items-start gap-x-5'>  

            <h1 className='text-gray-100 text-4xl sm:text-6xl font-bold'>0{number}</h1>

            <div className='flex flex-col gap-y-2'>

                <Link className='flex items-center gap-x-2' to={`/profile/${blog.author.personalInfo.username}`}>

                    <div>

                        <img className='w-10 h-10 rounded-full' src={blog.author.personalInfo.profileImage} alt='Author profile image' />

                    </div>

                    <span className='text-gray-500 text-xs sm:text-sm'>@{blog.author.personalInfo.username}</span>

                    <span className='text-gray-500 text-xs sm:text-sm'>{format(new Date(blog.createdAt), 'dd LLL yyyy')}</span>

                </Link>

                <Link to={`/blog/${blog.blogId}`}  className='text-xl sm:text-2xl line-clamp-2'>{blog.title}</Link>

                <div className='flex flex-wrap items-center gap-2'>

                    {

                        blog.topics.map((topic, index) => {

                            if (index > 2) return;

                            return <span key={index} className='text-xs sm:text-sm text-gray-500'>#{topic}</span>;

                        })

                    }

                </div>

            </div>

        </div>
    );
};

export default TrendingBlogCard;