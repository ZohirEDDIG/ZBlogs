import useBlogs from '../context/useBlogs';

import LatestBlogCard from './LatestBlogCard';

const LatestBlogs = () => {
    const { getLatestBlogsQuery } = useBlogs();

    return (
        <div className='flex flex-col gap-y-10'>
            {
                getLatestBlogsQuery.isPending 

                ?   <p>Fetching Latest Blogs...</p>

                :   getLatestBlogsQuery.isSuccess 

                ?    

                    getLatestBlogsQuery.data.data.blogs.map((blog) => (

                        <LatestBlogCard key={blog.blogId} blog={blog} />

                    ))

                :   getLatestBlogsQuery.isError

                ?   (
                    
                        getLatestBlogsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getLatestBlogsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default LatestBlogs;