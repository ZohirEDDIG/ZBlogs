import useBlogs from '../context/useBlogs';

import TrendingBlogCard from './TrendingBlogCard';

const TrendingBlogs = () => {
    const { getTrendingBlogsQuery } = useBlogs();

    return (
        <div className='flex flex-col gap-y-10'>
            {
                getTrendingBlogsQuery.isPending 

                ?   <p>Fetching Trending Blogs...</p>

                :   getTrendingBlogsQuery.isSuccess 

                ?    

                    getTrendingBlogsQuery.data.data.blogs.map((blog, index) => (

                        <TrendingBlogCard key={blog.blogId} number={index + 1} blog={blog} />

                    ))

                :   getTrendingBlogsQuery.isError

                ?   (
                    
                        getTrendingBlogsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getTrendingBlogsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default TrendingBlogs;