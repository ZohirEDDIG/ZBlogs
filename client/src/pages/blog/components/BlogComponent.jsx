import { Link } from 'react-router-dom';

import { format } from 'date-fns';

import { BlogActions, SimilarBlogs, BlogContent } from './';

const BlogComponent = ({ blog }) => {
    console.log(blog.content);
    return (
        <div className='flex flex-col gap-y-8'>

            <div>

                <img 
                    className='aspect-video w-full' 
                    src={blog.cover} 
                    alt='Blog Cover' 
                />

            </div>

            <h2 className='text-2xl'>{blog.title}</h2>

            <Link 
                className='flex gap-x-2'
                to={`/user/${blog.author.personalInfo.username}`}
            >

                <div>

                    <img 
                        className='w-8 rounded-full' 
                        src={blog.author.personalInfo.profileImage} 
                        alt='User Profile Image' 
                    />

                </div>

                <div className='flex flex-col'>

                    <span>{blog.author.personalInfo.fullName}</span>
                
                    <span className='text-gray-400 text-sm'>@{blog.author.personalInfo.username}</span>
                
                </div>
            
            </Link>

            <p className='text-gray-500'>Published on {format(new Date(blog.createdAt), 'dd LLL yyyy')}</p>

            <BlogContent blogContent={blog.content} />

            <BlogActions 
                totalLikes={blog.activity.totalLikes}
                totalComments={blog.activity.totalComments}
                blogId={blog.blogId}
                title={blog.title}
                authorUsername={blog.author.personalInfo.username}
            />

            <SimilarBlogs />

        </div>
    );
};

export default BlogComponent;