import { Link } from 'react-router-dom';

const TrendingBlogCard = ({ number, blog }) => {
    return (
        <div className='flex items-start gap-x-5'>  

            <h1 className='text-gray-100 text-6xl font-bold'>0{number}</h1>

            <div className='flex flex-col gap-y-2'>

                <Link className='flex items-center gap-x-2' to={`/profile/${blog.author.personalInfo.username}`}>

                    <div>

                        <img className='w-10 h-10 rounded-full' src={blog.author.personalInfo.profileImage} alt='Author profile image' />

                    </div>

                    <span className='text-gray-500 text-sm'>@{blog.author.personalInfo.username}</span>

                </Link>

                <Link to={`/blog/${blog.blogId}`}  className='text-2xl  line-clamp-2'>{blog.title}</Link>

            </div>

        </div>
    );
};

export default TrendingBlogCard;